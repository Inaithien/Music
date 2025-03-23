<?php

namespace App\Controller;

use App\Entity\Artist;
use App\Entity\Event;
use App\Repository\ArtistRepository;
use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'api_')]
class ApiController extends AbstractController
{
    private SerializerInterface $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    #[Route('/artists', name: 'artists_index', methods: ['GET'])]
    public function getArtists(ArtistRepository $artistRepository): JsonResponse
    {
        $artists = $artistRepository->findAll();

        $data = $this->serializer->serialize($artists, 'json', [
            'groups' => ['artist:read']
        ]);

        return $this->createCorsJsonResponse($data);
    }

    #[Route('/artists/{id}', name: 'artists_show', methods: ['GET'])]
    public function getArtist(Artist $artist): JsonResponse
    {
        $data = $this->serializer->serialize($artist, 'json', [
            'groups' => ['artist:read']
        ]);

        return $this->createCorsJsonResponse($data);
    }

    #[Route('/events', name: 'events_index', methods: ['GET'])]
    public function getEvents(EventRepository $eventRepository): JsonResponse
    {
        $events = $eventRepository->findAll();

        $data = $this->serializer->serialize($events, 'json', [
            'groups' => ['event:read']
        ]);

        return $this->createCorsJsonResponse($data);
    }

    #[Route('/events/{id}', name: 'events_show', methods: ['GET'])]
    public function getEvent(Event $event): JsonResponse
    {
        $data = $this->serializer->serialize($event, 'json', [
            'groups' => ['event:read']
        ]);

        return $this->createCorsJsonResponse($data);
    }

    private function createCorsJsonResponse(string $data): JsonResponse
    {
        $response = new JsonResponse($data, 200, [], true);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return $response;
    }
}