<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Category;
use App\Repository\CategoryRepository;

class EmulatorController extends AbstractController
{
    /**
     * @Route("/", name="emulator")
     */
    public function index(CategoryRepository $categoryRepository): Response
    {
        return $this->render('emulator/index.html.twig', [
            'controller_name' => 'EmulatorController',
            'categories' => $categoryRepository->findAll(), 
        ]);
    }
}
