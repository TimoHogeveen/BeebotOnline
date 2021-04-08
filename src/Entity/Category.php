<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 */
class Category
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
     * @ORM\OneToMany(targetEntity=Mat::class, mappedBy="category")
     */
    private $mats;

    public function __construct()
    {
        $this->mats = new ArrayCollection();
    }

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

    /**
     * @return Collection|Mat[]
     */
    public function getMats(): Collection
    {
        return $this->mats;
    }

    public function addMat(Mat $mat): self
    {
        if (!$this->mats->contains($mat)) {
            $this->mats[] = $mat;
            $mat->setCategory($this);
        }

        return $this;
    }

    public function removeMat(Mat $mat): self
    {
        if ($this->mats->removeElement($mat)) {
            // set the owning side to null (unless already changed)
            if ($mat->getCategory() === $this) {
                $mat->setCategory(null);
            }
        }

        return $this;
    }
}
