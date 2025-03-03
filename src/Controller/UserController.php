<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/information', name: 'user.index')]
    public function index(Request $request): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'User Information',
        ]);
    }

    #[Route('/information/{slug}', name: 'user.show')]
    public function show(Request $request, string $slug): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'Home Page',
            'welcome_message' => 'Welcome to homepage',
        ]);
    }
}