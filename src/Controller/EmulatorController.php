<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CategoryRepository;
use App\Repository\MatRepository;

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
}
