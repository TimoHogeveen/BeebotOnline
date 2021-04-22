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
         foreach ($matten as $mat) {
             $s .= "<option>". $mat->getName().' </option> ';
}
        return $response = new Response($s);

    }

    
}
