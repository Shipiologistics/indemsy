import styles from './page.module.css';

export const metadata = {
    title: 'Conditions Générales d’Utilisation et de Vente | FlyCompense',
    description: 'Consultez les conditions générales d’utilisation et de vente des services FlyCompense.',
};

export default function TermsPage() {
    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroPattern} />
                <div className={styles.container}>
                    <h1 className={styles.heroTitle}>📄 CONDITIONS GÉNÉRALES D’UTILISATION ET DE VENTE</h1>
                    <p className={styles.heroSubtitle}>Dernière mise à jour : 29 janvier 2026</p>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.card}>
                    <span className={styles.lastUpdated}>Version applicable à compter du 29 janvier 2026</span>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. ÉDITEUR DU SITE</h2>
                        <ul className={styles.iconList}>
                            <li>Le site https://www.flycompense.com/ (ci-après « le Site ») est édité par :</li>
                            <li><strong>Nom / Raison sociale :</strong> GIDDEM</li>
                            <li><strong>Forme juridique :</strong> SARLS</li>
                            <li><strong>Siège social :</strong> 155 ROUTE DE LONGWY, L-4831 RODANGE, LUXEMBOURG</li>
                            <li><strong>RCS / TVA :</strong> B303002</li>
                            <li><strong>Email :</strong> CONTACT@FLYCOMPENSE.COM</li>
                            <li><strong>Téléphone :</strong> 0035227864487</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. DÉFINITIONS</h2>
                        <p>Dans les présentes Conditions Générales (« CGU/CGV »), les termes suivants signifient :</p>
                        <ul>
                            <li><strong>Client / Utilisateur :</strong> toute personne accédant au Site et/ou passant une commande.</li>
                            <li><strong>Service(s) :</strong> prestations de conseils et/ou assistance à l’indemnisation de vols, retards, annulations et compensations liées aux voyages aériens.</li>
                            <li><strong>Parties :</strong> le Client et l’Éditeur.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. ACCEPTATION DES CONDITIONS</h2>
                        <p>L’accès au Site et l’utilisation des Services impliquent l’acceptation sans réserve des présentes CGU/CGV.</p>
                        <p>Toute prestation commandée implique l’adhésion sans restriction du Client aux présentes conditions.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. OBJET DU SERVICE</h2>
                        <p>FlyCompense propose :</p>
                        <ul>
                            <li>une évaluation gratuite ou payante du potentiel de compensation,</li>
                            <li>l’assistance à la constitution et au suivi de dossiers de réclamation aérienne,</li>
                            <li>des services supplémentaires (notifications, suivi prioritaire, assistance juridique, etc.).</li>
                        </ul>
                        <p>Les caractéristiques essentielles des Services sont présentées sur le Site. Il appartient au Client de les lire avant toute validation de commande.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. ACCÈS AU SITE</h2>
                        <p>L’accès au Site est libre et gratuit. Certains Services peuvent être soumis à paiement.</p>
                        <p>FlyCompense se réserve le droit de modifier, suspendre ou interrompre tout ou partie du Site sans préavis.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. COMMANDE ET PROCESSUS CONTRACTUEL</h2>
                        <p>Le processus de commande comprend :</p>
                        <ul>
                            <li>la sélection du Service,</li>
                            <li>la saisie des informations requises,</li>
                            <li>la validation du récapitulatif,</li>
                            <li>le paiement (si applicable),</li>
                            <li>la confirmation de commande par email.</li>
                        </ul>
                        <p>La validation de la commande vaut acceptation des CGU/CGV, des prix et de l’exécution des Services.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. TARIFS & PAIEMENT</h2>
                        <p>Les prix sont indiqués en euros (€), toutes taxes comprises (TTC).</p>
                        <p>Le paiement s’effectue par les moyens proposés sur le Site (carte bancaire, virement, etc.).</p>
                        <p>FlyCompense se réserve le droit de modifier ses prix, mais les Services seront facturés au tarif indiqué lors de la commande.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>8. DROIT DE RÉTRACTATION</h2>
                        <p>
                            👉 Le droit de rétractation ne s’applique pas pour les prestations de services pleinement exécutées avant la fin du délai de 14 jours,
                            et uniquement si l’exécution a commencé après accord express du Client et renoncement écrit au droit de rétractation.
                        </p>
                        <p>Si applicable, le Client dispose d’un délai de 14 jours à compter de la commande pour se rétracter sans motif.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>9. RESPONSABILITÉS</h2>
                        <ul>
                            <li>FlyCompense s’engage à fournir les Services avec diligence;</li>
                            <li>n’est pas responsable des décisions des compagnies aériennes;</li>
                            <li>ne garantit pas un résultat de compensation;</li>
                            <li>n’est pas responsable des données erronées fournies par l’utilisateur.</li>
                        </ul>
                        <p>La responsabilité de FlyCompense ne peut excéder le montant total payé par le Client pour le Service concerné.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>10. PROPRIÉTÉ INTELLECTUELLE</h2>
                        <p>Le contenu du Site (textes, logos, images, bases de données, codes) est protégé.</p>
                        <p>Toute reproduction, diffusion ou modification sans autorisation est interdite.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>11. DONNÉES PERSONNELLES (RGPD)</h2>
                        <p>FlyCompense collecte certaines données pour fournir ses Services.</p>
                        <div className={styles.highlight}>
                            <p><strong>Traitement conforme au RGPD :</strong></p>
                            <ul>
                                <li>Finalités : gestion des commandes, support client, optimisation des Services.</li>
                                <li>Base légale : exécution du contrat et consentement.</li>
                                <li>Droits : accès, rectification, suppression, opposition, limitation, portabilité.</li>
                                <li>Contact DPO : CONTACT@FLYCOMPENSE.COM.</li>
                            </ul>
                        </div>
                        <p>Les données ne sont jamais vendues à des tiers sans consentement.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>12. COOKIES & TRACKING</h2>
                        <p>Le Site utilise des cookies pour :</p>
                        <ul>
                            <li>garantir le fonctionnement de la plateforme,</li>
                            <li>améliorer l’expérience,</li>
                            <li>mesurer et optimiser les performances.</li>
                        </ul>
                        <p>Le consentement est sollicité à la première visite.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>13. MODIFICATIONS DES CGU/CGV</h2>
                        <p>FlyCompense peut à tout moment modifier les présentes CGU/CGV.</p>
                        <p>La version applicable est celle en ligne à la date de passation de commande.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>14. SERVICE CLIENT</h2>
                        <ul className={styles.iconList}>
                            <li>📧 Email : contact@flycompense.com</li>
                            <li>📞 Téléphone : 0035227864487</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>15. LOI APPLICABLE & JURIDICTION</h2>
                        <p>Les présentes CGU/CGV sont régies par le droit luxembourgeois au 155 route de Longwy.</p>
                        <p>En cas de litige, les Parties s’efforceront d’abord de régler à l’amiable. À défaut, les tribunaux compétents de la ville de Luxembourg seront seuls compétents.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
