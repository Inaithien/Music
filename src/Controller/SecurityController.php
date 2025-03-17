<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route('/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {

        if ($this->getUser()) {
            // Get the user object
            $user = $this->getUser();

            // Check roles explicitly from the user object
            $roles = $user->getRoles();

            // Check if ROLE_ADMIN is in the roles array
            if (in_array('ROLE_ADMIN', $roles)) {
                return $this->redirectToRoute('app_admin_dashboard');
            } else {
                return $this->redirectToRoute('app_event_index');
            }
        }
        $error = $authenticationUtils->getLastAuthenticationError();

        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error,
        ]);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout(): void
    {

    }
}