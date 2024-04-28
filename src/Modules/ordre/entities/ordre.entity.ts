import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Node } from 'src/common/node.entity';

@Entity('ordre') // Le nom 'ordres' est le nom de la table dans votre base de données
export class Ordre extends Node {
  @Column()
  Adressemembre: string; // Adresse du membre qui passe la commande

  @Column()
  ville: string; // Ville de livraison

  @Column()
  Numdetelephone: string; // Numéro de téléphone du membre

  @Column()
  Codepostal: string; // Code postal de l'adresse de livraison

  @Column('decimal', { precision: 10, scale: 2 })
  Prixtotal: number; // Prix total de la commande

  @Column()
  Quantite: number; // Quantité totale des produits commandés

  @Column({ nullable: true }) // Rendre l'attribut image optionnel
  Image?: string; // Image ou lien vers une image du produit principal de la commande
}
