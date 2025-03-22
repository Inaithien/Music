<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ReactAppController extends AbstractController
{
    #[Route('/app', name: 'app_react')]
    public function index(): Response
    {
        return $this->render('react_app/index.html.twig');
    }
}