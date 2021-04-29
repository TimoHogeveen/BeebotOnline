<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CategoryRepository;
use App\Repository\MatRepository;
use Symfony\Component\HttpFoundation\JsonResponse;

class EmulatorController extends AbstractController
{
    /**
     * @Route("/", name="emulator")
     */
    public function index(CategoryRepository $categoryRepository, MatRepository $matRepository): Response
    {
        return $this->render('emulator/index.html.twig', [
            'controller_name' => 'EmulatorController',
            'categories' => $categoryRepository->findAll(),
            'mats' => $matRepository->findAll(), 
        ]);
    }
    /**
     * @Route("/mats/{id}", name="matsid", methods={"GET"})
     */
    public function matsid(Request $request, MatRepository $matRepository): Response
    {
        $id = $request->get('id');
        $matten = $matRepository->findBy(array('category' => $id));
        $s = "";
        //$u = "";
         foreach ($matten as $mat) {
             $s .= "<option>". $mat->getName().' </option> ';
             //$u .= $mat->getImage()." ";
}
        return $response = new Response($s);
        //return $responseURL = new Response($u);

    }

    
}
