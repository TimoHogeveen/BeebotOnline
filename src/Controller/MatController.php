<?php

namespace App\Controller;

use App\Entity\Mat;
use App\Form\MatType;
use App\Repository\MatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
        return $this->render('mat/index.html.twig', [
            'mats' => $matRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="mat_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $mat = new Mat();
        $form = $this->createForm(MatType::class, $mat);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
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
        return $this->render('mat/show.html.twig', [
            'mat' => $mat,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="mat_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Mat $mat): Response
    {
        $form = $this->createForm(MatType::class, $mat);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('mat_index');
        }

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
        if ($this->isCsrfTokenValid('delete'.$mat->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($mat);
            $entityManager->flush();
        }

        return $this->redirectToRoute('mat_index');
    }
}
