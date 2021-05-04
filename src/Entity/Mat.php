<?php

namespace App\Entity;

use App\Repository\MatRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MatRepository::class)
 */
class Mat
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $image;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="mats")
     * @ORM\JoinColumn(nullable=false)
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="mats")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="integer")
     */
    private $horizontalboxes;

    /**
     * @ORM\Column(type="integer")
     */
    private $verticalboxes;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getHorizontalboxes(): ?int
    {
        return $this->horizontalboxes;
    }

    public function setHorizontalboxes(int $horizontalboxes): self
    {
        $this->horizontalboxes = $horizontalboxes;

        return $this;
    }

    public function getVerticalboxes(): ?int
    {
        return $this->verticalboxes;
    }

    public function setVerticalboxes(int $verticalboxes): self
    {
        $this->verticalboxes = $verticalboxes;

        return $this;
    }
}
