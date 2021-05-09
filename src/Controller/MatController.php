<?php

namespace App\Controller;

use App\Entity\Mat;
use App\Form\MatType;
use App\Repository\MatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;
// use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
// use Symfony\Component\Filesystem\Filesystem;

/**
 * @Route("/mat")
 */
class MatController extends AbstractController
{
    /**
     * @Route("/", name="mat_index", methods={"GET"})
     */
    public function index(MatRepository $matRepository): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('mat/index.html.twig', [
            'mats' => $matRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="mat_new", methods={"GET","POST"})
     */
    public function new(Request $request, SluggerInterface $slugger): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $mat = new Mat();
        $form = $this->createForm(MatType::class, $mat);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $user = $this->getUser();
            $mat->setUser($user);


        /** @var UploadedFile $imageFile */
        $imageFile = $form->get('image')->getData();

        // this condition is needed because the 'image' field is not required
        // so the PDF file must be processed only when a file is uploaded
        if ($imageFile) {
            $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
            // this is needed to safely include the file name as part of the URL
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename.'-'.uniqid().'.'.$imageFile->guessExtension();

            // Move the file to the directory where images are stored
            try {
                $imageFile->move(
                    $this->getParameter('images_directory'),
                    $newFilename
                );
            } catch (FileException $e) {
                // ... handle exception if something happens during file upload
            }

            // updates the 'imageFilename' property to store the PDF file name
            // instead of its contents
            $mat->setimage($newFilename);
        }
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($mat);
            $entityManager->flush();

            return $this->redirectToRoute('mat_index');
        }

        return $this->render('mat/new.html.twig', [
            'mat' => $mat,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="mat_show", methods={"GET"})
     */
    public function show(Mat $mat): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('mat/show.html.twig', [
            'mat' => $mat,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="mat_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Mat $mat): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $form = $this->createForm(MatType::class, $mat);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('mat_index');
        }
        $form->remove('image'); //Zorgt ervoor dat de form geen image property heeft, images worden alleen verwijdert bij totale verwijdering van mat
        return $this->render('mat/edit.html.twig', [
            'mat' => $mat,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="mat_delete", methods={"POST"})
     */
    public function delete(Request $request, Mat $mat): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        if ($this->isCsrfTokenValid('delete'.$mat->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $file = $this->getParameter("images_directory") . '/' . $mat->getImage(); 
            if ($file) {
               unlink($file); //Hier word de mat lokaal verwijderd
           }


            $entityManager->remove($mat);
            $entityManager->flush();
        }

        return $this->redirectToRoute('mat_index');
    }
}
