<?php

namespace App\Repository;

use App\Entity\Mat;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Mat|null find($id, $lockMode = null, $lockVersion = null)
 * @method Mat|null findOneBy(array $criteria, array $orderBy = null)
 * @method Mat[]    findAll()
 * @method Mat[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Mat::class);
    }

    // /**
    //  * @return Mat[] Returns an array of Mat objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Mat
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
