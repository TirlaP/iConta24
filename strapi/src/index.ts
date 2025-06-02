import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('🚀 Starting Romanian accounting data bootstrap...');

    try {
      // 1. Create Logo entry
      console.log('🎨 Creating logo...');
      
      // Skip logo creation for now as it requires an image
      // In a real scenario, you would upload an image first
      const logoId = null;

      // 2. Create or update Global settings for Romanian locale
      console.log('📝 Setting up global configuration...');
      
      const globalData = {
        navbar: {
          ...(logoId && { logo: logoId }),
          left_navbar_items: [
            { text: "Acasă", URL: "/", target: "_self" as const },
            { text: "Servicii", URL: "/servicii", target: "_self" as const },
            { text: "Înființare Firmă", URL: "/infiintare-firma", target: "_self" as const },
            { text: "Echipa", URL: "/echipa", target: "_self" as const },
            { text: "Blog", URL: "/blog", target: "_self" as const },
            { text: "Contact", URL: "/contact", target: "_self" as const }
          ],
          right_navbar_items: [
            { text: "Contul Meu", URL: "/contul-meu", target: "_self" as const },
            { text: "Solicită Ofertă", URL: "/contact#oferta", target: "_self" as const }
          ]
        },
        footer: {
          ...(logoId && { logo: logoId }),
          description: "Contabilitatea înseamnă mai mult decât să operezi documente și să raportezi cifrele. Înseamnă să îl ajuți pe antreprenor să ia deciziile în direcția cifrelor pe care și le dorește.",
          copyright: `Copyright © ${new Date().getFullYear()} iConta24`,
          designed_developed_by: "FACILITY ACCOUNT SRL",
          built_with: "CUI 37210737 • J33/377/2017",
          internal_links: [
            { text: "Contabilitate Financiară", URL: "/servicii#contabilitate", target: "_self" as const },
            { text: "Declarații Fiscale", URL: "/servicii#declaratii", target: "_self" as const },
            { text: "Salarizare & HR", URL: "/servicii#salarizare", target: "_self" as const },
            { text: "Înființare Firmă", URL: "/infiintare-firma", target: "_self" as const }
          ],
          policy_links: [
            { text: "GDPR", URL: "/gdpr", target: "_self" as const },
            { text: "Termeni și Condiții", URL: "/termeni-si-conditii", target: "_self" as const },
            { text: "Politica de Confidențialitate", URL: "/politica-confidentialitate", target: "_self" as const },
            { text: "FAQ", URL: "/faq", target: "_self" as const }
          ],
          social_media_links: [
            { text: "Facebook", URL: "https://facebook.com/iconta24", target: "_blank" as const },
            { text: "LinkedIn", URL: "https://linkedin.com/company/iconta24", target: "_blank" as const }
          ]
        },
        seo: {
          metaTitle: "iConta24 - Contabilitate Digitală pentru Afacerea Ta",
          metaDescription: "Servicii complete de contabilitate online. Platformă digitală modernă, consultanță gratuită, acces 24/7. Certificat CECCAR.",
          keywords: "contabilitate online, contabil, servicii contabilitate, contabilitate digitala, iconta24",
          canonicalURL: "https://iconta24.com",
          metaRobots: "index, follow",
          structuredData: {
            "@context": "https://schema.org",
            "@type": "AccountingService",
            "name": "iConta24",
            "description": "Servicii de contabilitate digitală"
          }
        }
      };

      // Check if global exists for Romanian locale
      const existingGlobal = await strapi.entityService.findMany('api::global.global', {
        filters: {},
        locale: 'ro'
      } as any);

      if (existingGlobal) {
        await strapi.entityService.update('api::global.global', existingGlobal.id, {
          data: {
            ...globalData,
            locale: 'ro'
          } as any
        });
        console.log('✅ Updated global settings');
      } else {
        await strapi.entityService.create('api::global.global', {
          data: {
            ...globalData,
            locale: 'ro'
          } as any
        });
        console.log('✅ Created global settings');
      }

      // 2. Create Homepage
      console.log('📄 Creating homepage...');
      
      const homepageData = {
        slug: "",
        seo: {
          metaTitle: "iConta24 - Contabilitate Digitală pentru Afacerea Ta",
          metaDescription: "Servicii complete de contabilitate online. Platformă digitală modernă, consultanță gratuită, acces 24/7.",
          keywords: "contabilitate online, contabil digital, servicii contabilitate",
          canonicalURL: "https://iconta24.com",
          metaRobots: "index, follow"
        },
        dynamic_zone: [
          {
            __component: "dynamic-zone.hero" as const,
            heading: "Digitalizează-ți procesul de contabilitate!",
            sub_heading: "Soluții moderne pentru afacerea ta",
            CTAs: [
              {
                text: "HAI SĂ NE CUNOAȘTEM!",
                URL: "/contact",
                variant: "primary" as const,
                target: "_self" as const
              },
              {
                text: "Vezi Serviciile",
                URL: "/servicii",
                variant: "outline" as const,
                target: "_self" as const
              }
            ]
          },
          {
            __component: "dynamic-zone.features" as const,
            heading: "De ce să colaborezi cu iConta24",
            sub_heading: "Ne adresăm firmelor care preferă ca serviciile de contabilitate să fie:",
            globe_card: {
              title: "Simple",
              description: "Încarci online documentele, noi le procesăm și le transformăm în cifre. Eviți pierderea de timp cu drumurile la cabinetul de contabilitate.",
              span: "one"
            },
            ray_card: {
              title: "Smart",
              description: "Folosim ultima tehnologie pentru serviciile de contabilitate, care asigură mai multă flexibilitate și eficiență.",
              before_ray_items: {
                item_1: "Platformă digitală",
                item_2: "Automatizare procese",
                item_3: "Rapoarte în timp real"
              },
              after_ray_items: {
                item_1: "Acces 24/7",
                item_2: "Backup automat",
                item_3: "Securitate maximă"
              },
              span: "one"
            },
            graph_card: {
              title: "Support",
              description: "Vei avea un contabil alocat companiei tale care îți va oferi suport. Ai acces, în timp real, la situația financiar-contabilă.",
              top_items: [
                { number: "100+", text: "Clienți mulțumiți" },
                { number: "10+", text: "Ani experiență" },
                { number: "24/7", text: "Disponibilitate" }
              ],
              highlighted_text: "Certificat CECCAR",
              span: "one"
            },
            social_media_card: {
              Title: "Safe",
              Description: "Suntem certificați CECCAR. Tehnologiile folosite respectă standarde de siguranță IT. Experiență de 10 ani în domeniu.",
              span: "one"
            }
          },
          {
            __component: "dynamic-zone.services" as const,
            heading: "Servicii de Contabilitate",
            sub_heading: "Îți stăm la dispoziție cu o gamă completă de servicii, ce pot fi adaptate nevoilor tale",
            services: [
              {
                title: "Contabilitate Financiară",
                description: "Servicii complete de contabilitate: jurnal TVA, balanță, registre contabile, bilanț anual pentru toate tipurile de companii.",
                icon: "calculator",
                price: "299 RON",
                highlighted: true,
                features: [
                  { label: "Jurnal TVA lunar", included: true },
                  { label: "Balanță lunară", included: true },
                  { label: "Registre contabile", included: true },
                  { label: "Bilanț anual", included: true }
                ]
              },
              {
                title: "Declarații Fiscale",
                description: "Realizarea și depunerea automată a tuturor declarațiilor fiscale necesare pentru compania dumneavoastră.",
                icon: "file-text",
                price: "199 RON",
                highlighted: false,
                features: [
                  { label: "Declarații lunare", included: true },
                  { label: "Depunere automată", included: true },
                  { label: "Monitorizare termene", included: true },
                  { label: "Alertă deadline-uri", included: true }
                ]
              },
              {
                title: "Salarizare & HR",
                description: "Servicii complete de salarizare și gestiune documente HR pentru echipa dumneavoastră.",
                icon: "users",
                price: "149 RON",
                highlighted: false,
                features: [
                  { label: "State de plată", included: true },
                  { label: "Revisal", included: true },
                  { label: "Contracte de muncă", included: true },
                  { label: "Pontaje electronice", included: true }
                ]
              }
            ]
          },
          {
            __component: "dynamic-zone.testimonials" as const,
            heading: "Opinia Clienților Noștri",
            sub_heading: "Peste 100 de companii ne-au ales pentru serviciile de contabilitate"
          },
          {
            __component: "dynamic-zone.how-it-works" as const,
            heading: "Cum Funcționează",
            sub_heading: "Procesul nostru simplu în 4 pași",
            steps: [
              {
                title: "1. Înregistrare",
                description: "Creează-ți cont gratuit și completează datele firmei tale"
              },
              {
                title: "2. Încarcă Documente",
                description: "Uploadează facturile și documentele direct în platformă"
              },
              {
                title: "3. Procesare Automată",
                description: "Noi procesăm și organizăm toate documentele tale"
              },
              {
                title: "4. Rapoarte în Timp Real",
                description: "Accesează situația financiară oricând, de oriunde"
              }
            ]
          },
          {
            __component: "dynamic-zone.pricing" as const,
            heading: "Pachete și Prețuri",
            sub_heading: "Alege pachetul potrivit pentru afacerea ta"
          },
          {
            __component: "dynamic-zone.cta" as const,
            heading: "Pregătit să Digitalizezi Contabilitatea?",
            sub_heading: "Alătură-te celor peste 100 de companii care și-au simplificat procesul contabil",
            CTAs: [
              {
                text: "Începe Acum - Consultanță Gratuită",
                URL: "/contact",
                variant: "primary" as const,
                target: "_self" as const
              },
              {
                text: "Vezi Demo Platformă",
                URL: "/demo",
                variant: "outline" as const,
                target: "_self" as const
              }
            ]
          }
        ],
        locale: "ro"
      };

      // Check if homepage exists
      const existingHomepage = await strapi.entityService.findMany('api::page.page', {
        filters: { slug: "", locale: "ro" }
      });

      if (existingHomepage && existingHomepage.length > 0) {
        await strapi.entityService.update('api::page.page', existingHomepage[0].id, {
          data: homepageData as any
        });
        console.log('✅ Updated homepage');
      } else {
        await strapi.entityService.create('api::page.page', {
          data: homepageData as any
        });
        console.log('✅ Created homepage');
      }

      // 3. Create other pages
      console.log('📄 Creating additional pages...');
      
      const additionalPages = [
        {
          slug: "servicii",
          seo: {
            metaTitle: "Servicii Contabilitate - iConta24",
            metaDescription: "Servicii complete: contabilitate financiară, declarații fiscale, salarizare, înființare firmă.",
            canonicalURL: "https://iconta24.com/servicii",
            metaRobots: "index, follow"
          },
          dynamic_zone: [
            {
              __component: "dynamic-zone.hero" as const,
              heading: "Îți stăm la dispoziție cu o gamă completă de servicii,",
              sub_heading: "ce pot fi adaptate nevoilor tale.",
              CTAs: [
                {
                  text: "CERE OFERTĂ PERSONALIZATĂ",
                  URL: "#formular",
                  variant: "primary" as const,
                  target: "_self" as const
                }
              ]
            },
            {
              __component: "dynamic-zone.services" as const,
              heading: "Toate Serviciile Noastre",
              sub_heading: "Descoperă gama completă de servicii contabile și alege pachetul potrivit pentru afacerea ta",
              services: [
                {
                  title: "Contabilitate Financiară",
                  description: "Servicii complete de contabilitate: jurnal TVA, balanță, registre contabile, bilanț anual pentru toate tipurile de companii.",
                  icon: "calculator",
                  price: "299 RON",
                  highlighted: true,
                  features: [
                    { label: "Jurnal TVA lunar", included: true },
                    { label: "Balanță lunară", included: true },
                    { label: "Registre contabile", included: true },
                    { label: "Bilanț anual", included: true },
                    { label: "Consultanță fiscală", included: true }
                  ]
                },
                {
                  title: "Declarații Fiscale",
                  description: "Realizarea și depunerea automată a tuturor declarațiilor fiscale necesare pentru compania dumneavoastră.",
                  icon: "file-text",
                  price: "199 RON",
                  highlighted: false,
                  features: [
                    { label: "Declarații lunare", included: true },
                    { label: "Depunere automată", included: true },
                    { label: "Monitorizare termene", included: true },
                    { label: "Alertă deadline-uri", included: true },
                    { label: "Arhivare documentare", included: true }
                  ]
                },
                {
                  title: "Salarizare & HR",
                  description: "Servicii complete de salarizare și gestiune documente HR pentru echipa dumneavoastră.",
                  icon: "users",
                  price: "149 RON",
                  highlighted: false,
                  features: [
                    { label: "State de plată", included: true },
                    { label: "Revisal", included: true },
                    { label: "Contracte de muncă", included: true },
                    { label: "Pontaje electronice", included: true },
                    { label: "Concedii și sărbători", included: true }
                  ]
                },
                {
                  title: "Consultanță Fiscală",
                  description: "Consultanță specializată pentru optimizarea fiscală și conformitate cu legislația în vigoare.",
                  icon: "briefcase",
                  price: "399 RON",
                  highlighted: false,
                  features: [
                    { label: "Analiză fiscală", included: true },
                    { label: "Optimizare taxe", included: true },
                    { label: "Planificare fiscală", included: true },
                    { label: "Suport legislativ", included: true },
                    { label: "Audit intern", included: true }
                  ]
                },
                {
                  title: "Analize Financiare",
                  description: "Rapoarte detaliate și analize pentru înțelegerea performanței financiare a companiei.",
                  icon: "chart-line",
                  price: "249 RON",
                  highlighted: false,
                  features: [
                    { label: "Dashboard financiar", included: true },
                    { label: "Rapoarte personalizate", included: true },
                    { label: "Indicatori KPI", included: true },
                    { label: "Analiză cash-flow", included: true },
                    { label: "Prognoze financiare", included: true }
                  ]
                },
                {
                  title: "Servicii Premium",
                  description: "Pachet complet cu toate serviciile pentru companiile care doresc suport total.",
                  icon: "shield-check",
                  price: "899 RON",
                  highlighted: true,
                  features: [
                    { label: "Toate serviciile incluse", included: true },
                    { label: "Support prioritar", included: true },
                    { label: "Contabil dedicat", included: true },
                    { label: "Consultanță nelimitată", included: true },
                    { label: "Analize avansate", included: true }
                  ]
                }
              ]
            },
            {
              __component: "dynamic-zone.form-next-to-section" as const,
              heading: "Formular Ofertă Personalizată",
              sub_heading: "Completează formularul și îți oferim o soluție adaptată nevoilor tale",
              section: {
                heading: "Servicii de contabilitate integrată",
                sub_heading: "",
                description: "✓ Alegem împreună softul cel mai bun pentru afacerea ta\n✓ Ai toate informațiile (gestiune, facturi, registru de casă, balanță) pe aceeași platformă\n✓ Optimizezi costurile cu contabilitatea\n✓ Toate tranzacțiile se înregistrează automat și în contabilitatea financiară\n✓ Comunicare mai eficientă cu contabilitatea\n✓ Economisești timp și bani"
              },
              form: {
                heading: "Solicită Ofertă",
                inputs: [
                  { label: "Numele firmei *", name: "company", type: "text" as const, placeholder: "Ex: ABC Solutions SRL", required: true },
                  { label: "Numele dvs *", name: "name", type: "text" as const, placeholder: "Ion Popescu", required: true },
                  { label: "Email *", name: "email", type: "email" as const, placeholder: "email@firma.ro", required: true },
                  { label: "Numărul de telefon *", name: "phone", type: "tel" as const, placeholder: "07XX XXX XXX", required: true },
                  { label: "Număr angajați", name: "employees", type: "number" as const, placeholder: "Ex: 5", required: false },
                  { label: "Domeniu activitate", name: "domain", type: "text" as const, placeholder: "Ex: IT, Comerț, Producție", required: false },
                  { label: "Dacă doriți să adăugați ceva", name: "message", type: "textarea" as const, placeholder: "Descrieți serviciile de care aveți nevoie", required: false }
                ],
                button: {
                  text: "Trimite",
                  variant: "primary" as const
                },
                terms_checkbox: {
                  label: "Sunt de acord",
                  description: "Am citit și sunt de acord cu Termenii și condițiile iConta24 și cu Politica de prelucrare a datelor cu caracter personal"
                }
              }
            },
            {
              __component: "dynamic-zone.cta" as const,
              heading: "Pregătit să începem colaborarea?",
              sub_heading: "Solicită oferta personalizată de preț adaptată nevoilor tale",
              CTAs: [
                {
                  text: "SOLICITĂ OFERTĂ PERSONALIZATĂ DE PREȚ",
                  URL: "/contact",
                  variant: "primary" as const,
                  target: "_self" as const
                }
              ]
            }
          ],
          locale: "ro"
        },
        {
          slug: "contact",
          seo: {
            metaTitle: "Contact iConta24 - Consultanță Gratuită",
            metaDescription: "Contactează-ne: 0745 823 960, contact@iconta24.com. Birouri în Suceava și București.",
            canonicalURL: "https://iconta24.com/contact",
            metaRobots: "index, follow"
          },
          dynamic_zone: [
            {
              __component: "dynamic-zone.hero" as const,
              heading: "Contactează-ne!",
              sub_heading: "Suntem aici să te ajutăm cu servicii de contabilitate de calitate",
              CTAs: [
                {
                  text: "0745 823 960",
                  URL: "tel:0745823960",
                  variant: "primary" as const,
                  target: "_self" as const
                },
                {
                  text: "contact@iconta24.com",
                  URL: "mailto:contact@iconta24.com",
                  variant: "outline" as const,
                  target: "_self" as const
                }
              ]
            },
            {
              __component: "dynamic-zone.form-next-to-section" as const,
              heading: "Trimite-ne un mesaj",
              sub_heading: "Completează formularul și te vom contacta în cel mai scurt timp posibil",
              section: {
                heading: "Informații de contact",
                sub_heading: "Date de contact și birouri",
                description: "📍 Birou Suceava\nStr. Gheorghe Doja nr.99\nTelefon: 0745 823 960\nE-mail: contact@iconta24.com\n\n📍 Birou București\nOtopeni\nTelefon: 0745 823 960\nE-mail: contact@iconta24.com\n\n🕐 Program:\nLuni - Vineri: 09:00 - 18:00\nSâmbătă - Duminică: Închis"
              },
              form: {
                heading: "Formular Contact",
                inputs: [
                  { label: "Name *", name: "name", type: "text" as const, placeholder: "Nume", required: true },
                  { label: "Phone Number *", name: "phone", type: "tel" as const, placeholder: "Telefon", required: true },
                  { label: "Email *", name: "email", type: "email" as const, placeholder: "E-mail", required: true },
                  { label: "Message", name: "message", type: "textarea" as const, placeholder: "Mesaj", required: false }
                ],
                button: {
                  text: "Trimite",
                  variant: "primary" as const
                },
                terms_checkbox: {
                  label: "Sunt de acord",
                  description: "Am citit și sunt de acord cu Termenii și condițiile iConta24 și cu Politica de prelucrare a datelor cu caracter personal"
                }
              }
            },
            {
              __component: "dynamic-zone.features" as const,
              heading: "Cine suntem noi?",
              sub_heading: "Suntem o echipă tânără, cu experiență în domeniul contabilității",
              globe_card: {
                title: "Detalii firmă",
                description: "FACILITY ACCOUNT SRL\n\nCUI 37210737\nNr. Înmatriculare J33/377/2017\nAdresa: Comănești 155, Suceava",
                span: "two"
              },
              ray_card: {
                title: "Misiunea noastră",
                description: "Să oferim servicii de contabilitate digitală moderne și eficiente",
                before_ray_items: {
                  item_1: "Transparență totală",
                  item_2: "Acces online 24/7",
                  item_3: "Consultanță gratuită"
                },
                after_ray_items: {
                  item_1: "Certificat CECCAR",
                  item_2: "10+ ani experiență",
                  item_3: "100+ clienți mulțumiți"
                },
                span: "two"
              },
              social_media_card: {
                Title: "Urmărește-ne",
                Description: "Facebook: facebook.com/iconta24\nLinkedIn: linkedin.com/company/iconta24",
                span: "two"
              }
            },
            {
              __component: "dynamic-zone.cta" as const,
              heading: "Hai să ne cunoaștem!",
              sub_heading: "Programează o consultanță gratuită pentru a discuta despre nevoile tale",
              CTAs: [
                {
                  text: "HAI SĂ NE CUNOAȘTEM!",
                  URL: "#formular",
                  variant: "primary" as const,
                  target: "_self" as const
                }
              ]
            }
          ],
          locale: "ro"
        },
        {
          heading: "Înființare Firmă",
          slug: "infiintare-firma",
          description: "Îți deschidem firma rapid și simplu",
          seo: {
            metaTitle: "Înființare Firmă Rapid - iConta24",
            metaDescription: "Înființare firmă în 3 pași simpli. Ne ocupăm de toate documentele necesare.",
            keywords: "infiintare firma, deschidere firma, acte firma",
            canonicalURL: "https://iconta24.com/infiintare-firma",
            metaRobots: "index, follow"
          },
          dynamic_zone: [
            {
              __component: "dynamic-zone.hero" as const,
              heading: "Îți deschizi o firmă nouă?",
              sub_heading: "Ne lași câteva denumiri de firmă, iar următorul pas pe care va trebui să îl mai faci tu este doar să semnezi documentele",
              CTAs: [
                {
                  text: "Completează Formularul",
                  URL: "#formular",
                  variant: "primary" as const,
                  target: "_self" as const
                }
              ]
            },
            {
              __component: "dynamic-zone.how-it-works" as const,
              heading: "Cum funcționează?",
              sub_heading: "Proces simplu în 3 pași",
              steps: [
                {
                  sub_heading: "01",
                  heading: "Alegi Denumirea",
                  description: "Scrie-ne în formularul de mai jos cum ai vrea să se numească firma ta (3-5 variante)"
                },
                {
                  sub_heading: "02",
                  heading: "Semnezi Digital", 
                  description: "În mai puțin de 2 minute, folosind semnătura electronică"
                },
                {
                  sub_heading: "03",
                  heading: "Primești Actele",
                  description: "După ce stabilim detaliile, edităm documentele și le depunem la ONRC"
                }
              ]
            },
            {
              __component: "dynamic-zone.features" as const,
              heading: "Ce trebuie să clarificăm împreună",
              sub_heading: "Înainte să începem procesul de înființare",
              globe_card: {
                title: "Sediul Social",
                description: "Adresa unde vei stabili sediul social al firmei. Poate fi adresa ta de domiciliu sau o altă locație.",
                span: "two"
              },
              ray_card: {
                title: "Activități CAEN",
                description: "Activitățile pe care le vei desfășura pe firmă",
                before_ray_items: {
                  item_1: "Consultanță și servicii",
                  item_2: "Comerț cu amănuntul",
                  item_3: "Producție și fabricare"
                },
                after_ray_items: {
                  item_1: "Transport și logistică",
                  item_2: "IT și dezvoltare software",
                  item_3: "Construcții"
                }
              },
              graph_card: {
                title: "Modalitate Depunere",
                description: "Alegem împreună cea mai bună metodă",
                top_items: [
                  { heading: "Electronic", sub_heading: "Cu semnătură digitală" },
                  { heading: "Procură", sub_heading: "Notarială" },
                  { heading: "Personal", sub_heading: "La ONRC" }
                ]
              },
              social_media_card: {
                title: "Documente Necesare",
                description: "Îți spunem exact ce acte trebuie să pregătești"
              }
            },
            {
              __component: "dynamic-zone.form-next-to-section" as const,
              heading: "Formular Înființare Firmă",
              sub_heading: "Completează formularul și te contactăm în maxim 24 ore",
              section: {
                heading: "De ce să alegi iConta24?",
                sub_heading: "Experiență și profesionalism",
                description: "✅ Peste 500 de firme înființate\n✅ Proces rapid și simplu\n✅ Consultanță gratuită\n✅ Asistență completă până la finalizare\n✅ Prețuri transparente"
              },
              form: {
                heading: "Date pentru înființare",
                inputs: [
                  { label: "Sugestie nume firmă 1 *", name: "nume1", type: "text" as const, placeholder: "Ex: ABC Solutions SRL", required: true },
                  { label: "Sugestie nume firmă 2 *", name: "nume2", type: "text" as const, placeholder: "Ex: XYZ Consulting SRL", required: true },
                  { label: "Sugestie nume firmă 3 *", name: "nume3", type: "text" as const, placeholder: "Ex: Digital Services SRL", required: true },
                  { label: "Sugestie nume firmă 4", name: "nume4", type: "text" as const, placeholder: "Opțional", required: false },
                  { label: "Sugestie nume firmă 5", name: "nume5", type: "text" as const, placeholder: "Opțional", required: false },
                  { label: "Numele dvs *", name: "name", type: "text" as const, placeholder: "Ion Popescu", required: true },
                  { label: "Email *", name: "email", type: "email" as const, placeholder: "email@exemplu.ro", required: true },
                  { label: "Numărul de telefon *", name: "phone", type: "tel" as const, placeholder: "07XX XXX XXX", required: true },
                  { label: "Detalii adiționale", name: "message", type: "textarea" as const, placeholder: "Activități CAEN, sediu social, alte detalii relevante", required: false }
                ],
                button: {
                  text: "Trimite",
                  variant: "primary" as const
                },
                terms_checkbox: {
                  label: "Sunt de acord",
                  description: "Am citit și sunt de acord cu Termenii și condițiile iConta24 și cu Politica de prelucrare a datelor cu caracter personal"
                }
              }
            }
          ],
          locale: "ro"
        },
        {
          heading: "Echipa",
          slug: "echipa",
          description: "Echipa noastră de profesioniști",
          seo: {
            metaTitle: "Echipa iConta24 - Experți Contabili Certificați",
            metaDescription: "Echipă tânără cu experiență de peste 10 ani în contabilitate. Membri CECCAR.",
            keywords: "echipa contabili, experti contabili, contabil certificat",
            canonicalURL: "https://iconta24.com/echipa",
            metaRobots: "index, follow"
          },
          dynamic_zone: [
            {
              __component: "dynamic-zone.hero" as const,
              heading: "Iată câteva lucruri despre echipa noastră:",
              sub_heading: "13 Membri • 13+ Ani experiență • Certificări CECCAR • 100% Dedicare",
              CTAs: [
                {
                  text: "HAI SĂ NE CUNOAȘTEM!",
                  URL: "/contact",
                  variant: "primary" as const,
                  target: "_self" as const
                }
              ]
            },
            {
              __component: "dynamic-zone.team" as const,
              heading: "Membrii echipei",
              sub_heading: "Profesioniști dedicați succesului afacerii tale",
              members: [
                {
                  name: "Mihai Maierean",
                  role: "Founder & CEO",
                  description: "Trainer, Consultant de business, Expert Contabil. Experiență de 13 ani în domeniul financiar-contabil. Membru CECCAR din anul 2013. Va avea grijă ca experiența ta, în calitate de partener iConta24 să fie una plină de succes.",
                  email: "mihai@iconta24.com"
                },
                {
                  name: "Maricela Terinte",
                  role: "Team Leader & Business Analyst",
                  description: "Experiență de 10+ ani în domeniul financiar contabil. Se asigură că tot procesul de la preluarea documentelor până la depunerea declarațiilor este funcțional.",
                  email: "contact@iconta24.com"
                },
                {
                  name: "Marieta Ciucanel",
                  role: "Contabil Senior",
                  description: "Experiență de minim 6 ani în contabilitate financiară. Perseverează mult în domeniu și îi place foarte mult să analizeze cifrele din balanță.",
                  email: "contact@iconta24.com",
                  phone: "+40 771 081 783"
                },
                {
                  name: "Sînziana Popescu",
                  role: "Contabil Senior",
                  description: "Este foarte perseverentă și învață rapid. Este curioasă mereu și îi place să observe cum se așează înregistrările contabile în balanță și în declarații fiscale. Nu se lasă până nu reușește să rezolve tot și să iasă toate perfecte.",
                  email: "contact@iconta24.com",
                  phone: "+40 771 082 439"
                },
                {
                  name: "Ancuța Juravle",
                  role: "Contabil Senior",
                  description: "Disciplinată și foarte orientată să studieze domeniul vast al contabilității. Este atentă la detalii și foarte operativă.",
                  email: "contact@iconta24.com"
                },
                {
                  name: "Florin Palamariu",
                  role: "Contabil Junior",
                  description: "Are deja un an de experiență în contabilitatea financiară. Este foarte orientat spre aplicarea tehnologiei în domeniul contabilității.",
                  email: "contact@iconta24.com"
                },
                {
                  name: "Dumitrița Lupușor",
                  role: "Contabil Junior",
                  description: "Învață foarte repede și este foarte ordonată cu actele. Îi place să le opereze corect dar și rapid. Perseverența o caracterizează și își dorește să evolueze rapid.",
                  email: "contact@iconta24.com"
                },
                {
                  name: "Oana Merciu",
                  role: "Consilier Vânzări",
                  description: "Se va asigura că va găsi cea mai bună ofertă pentru activitatea firmei tale. Îi place foarte mult să comunice și este tot timpul cu zâmbetul pe buze.",
                  phone: "+40 771 083 174"
                },
                {
                  name: "Andreea Madalina Amancei",
                  role: "Economist Contabil",
                  description: "Este foarte perseverentă și ambițioasă. Îi place să fie mereu promptă și să livreze la timp.",
                  email: "contact@iconta24.com",
                  phone: "+40 762 124 871"
                },
                {
                  name: "Ionică Larisa",
                  role: "Asistent Manager",
                  description: "Asistă echipa de management în coordonarea activităților zilnice și asigură buna funcționare a proceselor interne.",
                  email: "contact@iconta24.com"
                },
                {
                  name: "iContescu",
                  role: "Robotelul Digital",
                  description: "Robotelul digital la fel de talentat ca un contabil dar care înregistrează operațiuni mult mai rapid. Lucrează în schimb de noapte. Nu prea este sociabil așa că nu are date de contact. 🤖",
                  email: null,
                  phone: null
                },
                {
                  name: "Mihaela Cotoc",
                  role: "Economist Contabil",
                  description: "Responsabilă și altruistă. Evoluția este unul din punctele ei forte și îi place foarte mult să comunice. Este deschisă zilnic la noi provocări.",
                  email: "contact@iconta24.com",
                  phone: "+40 771 081 783",
                  onLeave: true,
                  leaveDetails: "Concediu de creștere îngrijire copil între 01.05.2023 – 01.05.2025"
                },
                {
                  name: "Anca Strugariu",
                  role: "Economist Contabil",
                  description: "Este consecventă și îi plac mult cifrele. Dispusă mereu să ajute și îmbină cu pasiune contabilitatea cu o atmosferă plăcută în birou.",
                  email: "contact@iconta24.com",
                  phone: "+40 771 082 439",
                  onLeave: true,
                  leaveDetails: "Concediu de creștere îngrijire copil între 01.03.2023 – 01.03.2025"
                }
              ]
            } as any,
            {
              __component: "dynamic-zone.features" as const,
              heading: "Cine suntem noi?",
              sub_heading: "Suntem o echipă tânără, cu experiență în domeniul contabilității, managementului financiar și IT",
              globe_card: {
                title: "Misiunea Noastră",
                description: "Folosindu-ne de experiența dobândită și de noile tehnologii IT, ne-am propus să aducem pe piață un concept simplificat de a ține evidența contabilă, în pas cu noile tendințe globale.",
                span: "three"
              }
            },
            {
              __component: "dynamic-zone.testimonials" as const,
              heading: "Ce ne reprezintă",
              sub_heading: "Motto-ul nostru",
              testimonials_reference: [] // Will be populated with special testimonial
            }
          ],
          locale: "ro"
        },
        {
          heading: "Blog",
          slug: "blog",
          description: "Articole și resurse utile despre contabilitate",
          seo: {
            metaTitle: "Blog Contabilitate - iConta24",
            metaDescription: "Articole utile despre contabilitate, fiscalitate și legislație pentru antreprenori.",
            keywords: "blog contabilitate, articole fiscale, noutati legislative",
            canonicalURL: "https://iconta24.com/blog",
            metaRobots: "index, follow"
          },
          locale: "ro"
        }
      ];

      for (const pageData of additionalPages) {
        try {
          const existingPage = await strapi.entityService.findMany('api::page.page', {
            filters: { slug: pageData.slug, locale: pageData.locale }
          });

          if (existingPage && existingPage.length > 0) {
            await strapi.entityService.update('api::page.page', existingPage[0].id, {
              data: pageData as any
            });
            console.log(`✅ Updated page: ${pageData.slug}`);
          } else {
            await strapi.entityService.create('api::page.page', {
              data: pageData as any
            });
            console.log(`✅ Created page: ${pageData.slug}`);
          }
        } catch (error) {
          console.error(`❌ Error with page ${pageData.slug}:`, error);
        }
      }

      // 4. Create Plans
      console.log('💰 Creating pricing plans...');
      
      const plans = [
        {
          name: "Start",
          price: 199,
          sub_text: "lei/lună",
          featured: false,
          CTA: {
            text: "Alege Pachetul Start",
            URL: "/contact?plan=start",
            variant: "outline" as const,
            target: "_self" as const
          },
          perks: [
            { text: "Până la 10 facturi/lună" },
            { text: "Contabilitate primară" },
            { text: "Declarații fiscale lunare" },
            { text: "Suport email" }
          ],
          additional_perks: [
            { text: "Acces platformă online" },
            { text: "Backup automat" }
          ]
        },
        {
          name: "Business",
          price: 399,
          sub_text: "lei/lună",
          featured: true,
          CTA: {
            text: "Alege Pachetul Business",
            URL: "/contact?plan=business",
            variant: "primary" as const,
            target: "_self" as const
          },
          perks: [
            { text: "Până la 50 facturi/lună" },
            { text: "Contabilitate completă" },
            { text: "Declarații fiscale lunare" },
            { text: "Salarizare până la 5 angajați" },
            { text: "Suport prioritar" }
          ],
          additional_perks: [
            { text: "Consultanță fiscală inclusă" },
            { text: "Rapoarte personalizate" },
            { text: "Training platformă" }
          ]
        },
        {
          name: "Enterprise",
          price: 799,
          sub_text: "lei/lună",
          featured: false,
          CTA: {
            text: "Alege Pachetul Enterprise",
            URL: "/contact?plan=enterprise",
            variant: "outline" as const,
            target: "_self" as const
          },
          perks: [
            { text: "Facturi nelimitate" },
            { text: "Contabilitate completă" },
            { text: "Toate declarațiile fiscale" },
            { text: "Salarizare nelimitată" },
            { text: "Contabil dedicat" }
          ],
          additional_perks: [
            { text: "Audit intern anual" },
            { text: "Consultanță strategică" },
            { text: "Integrări API personalizate" },
            { text: "Suport 24/7" }
          ]
        }
      ];

      for (const planData of plans) {
        try {
          await strapi.entityService.create('api::plan.plan', {
            data: planData
          });
          console.log(`✅ Created plan: ${planData.name}`);
        } catch (error) {
          console.error(`❌ Error creating plan ${planData.name}:`, error);
        }
      }

      // 5. Create Testimonials
      console.log('💬 Creating testimonials...');
      
      const testimonials = [
        {
          text: "Servicii excelente! Echipa iConta24 ne-a simplificat mult procesul contabil. Recomand cu încredere!",
          user: {
            firstname: "Maria",
            lastname: "Popescu",
            job: "Director General, ABC Solutions SRL"
          },
          locale: "ro"
        },
        {
          text: "Profesionalism desăvârșit și răspuns prompt la toate întrebările. Platformă intuitivă și ușor de folosit.",
          user: {
            firstname: "Ion",
            lastname: "Georgescu",
            job: "CEO, Tech Innovations"
          },
          locale: "ro"
        },
        {
          text: "De când colaborăm cu iConta24, nu mai avem griji legate de contabilitate. Totul este transparent și la timp.",
          user: {
            firstname: "Ana",
            lastname: "Dumitrescu",
            job: "Manager, Design Studio"
          },
          locale: "ro"
        }
      ];

      for (const testimonialData of testimonials) {
        try {
          await strapi.entityService.create('api::testimonial.testimonial', {
            data: testimonialData
          });
          console.log(`✅ Created testimonial from: ${testimonialData.user.firstname} ${testimonialData.user.lastname}`);
        } catch (error) {
          console.error(`❌ Error creating testimonial:`, error);
        }
      }

      // 6. Create Blog Page
      console.log('📝 Creating blog page...');
      
      const blogPageData = {
        heading: "Blog & Resurse",
        sub_heading: "Află ultimele noutăți din domeniul contabilității și fiscalității",
        locale: "ro"
      };

      const existingBlogPage = await strapi.entityService.findMany('api::blog-page.blog-page', {
        filters: { locale: "ro" }
      });

      if (existingBlogPage) {
        // For single types, findMany returns a single object, not an array
        await strapi.entityService.update('api::blog-page.blog-page', existingBlogPage.id, {
          data: blogPageData as any
        });
        console.log('✅ Updated blog page');
      } else {
        await strapi.entityService.create('api::blog-page.blog-page', {
          data: blogPageData as any
        });
        console.log('✅ Created blog page');
      }

      // 7. Create Categories
      console.log('📂 Creating categories...');
      
      const categories = [
        { name: "Fiscalitate" },
        { name: "Legislație" },
        { name: "Contabilitate" },
        { name: "Resurse HR" },
        { name: "Digitalizare" }
      ];

      const createdCategories = [];
      for (const categoryData of categories) {
        try {
          const existingCategory = await strapi.entityService.findMany('api::category.category', {
            filters: { name: categoryData.name }
          });

          if (existingCategory && existingCategory.length > 0) {
            createdCategories.push(existingCategory[0]);
          } else {
            const category = await strapi.entityService.create('api::category.category', {
              data: categoryData as any
            });
            createdCategories.push(category);
          }
        } catch (error) {
          console.error(`❌ Error creating category ${categoryData.name}:`, error);
        }
      }
      console.log(`✅ Created/updated ${createdCategories.length} categories`);

      // 8. Create Sample Articles
      console.log('📰 Creating sample articles...');
      
      const sampleArticles = [
        {
          title: "Ghid Complet: Cum să îți optimizezi cheltuielile deductibile în 2024",
          slug: "ghid-optimizare-cheltuieli-deductibile-2024",
          description: "Descoperă toate tipurile de cheltuieli pe care le poți deduce legal pentru a reduce impozitele firmei tale în 2024.",
          // Skip content for now - it requires specific Strapi blocks format
          categories: createdCategories.filter(c => ["Fiscalitate", "Contabilitate"].includes(c.name)).map(c => c.id)
        },
        {
          title: "Noutăți Legislative: Modificări importante în Codul Fiscal 2024",
          slug: "noutati-legislative-cod-fiscal-2024",
          description: "Toate modificările importante din Codul Fiscal care afectează afacerea ta în 2024. Ce trebuie să știi ca antreprenor.",
          categories: createdCategories.filter(c => ["Legislație", "Fiscalitate"].includes(c.name)).map(c => c.id)
        },
        {
          title: "Digitalizarea Contabilității: 5 Pași pentru Automatizare Completă",
          slug: "digitalizare-contabilitate-automatizare",
          description: "Cum să digitalizezi procesele contabile și să economisești timp și bani prin automatizare. Ghid practic pas cu pas.",
          categories: createdCategories.filter(c => ["Digitalizare", "Contabilitate"].includes(c.name)).map(c => c.id)
        }
      ];

      for (const articleData of sampleArticles) {
        try {
          const existingArticle = await strapi.entityService.findMany('api::article.article', {
            filters: { slug: articleData.slug, locale: "ro" }
          });

          if (!existingArticle || existingArticle.length === 0) {
            await strapi.entityService.create('api::article.article', {
              data: {
                ...articleData,
                publishedAt: new Date(),
                locale: "ro"
              } as any
            });
            console.log(`✅ Created article: ${articleData.title}`);
          }
        } catch (error) {
          console.error(`❌ Error creating article ${articleData.title}:`, error);
        }
      }

      console.log('✨ Romanian accounting data bootstrap completed!');
      
    } catch (error) {
      console.error('❌ Bootstrap error:', error);
      // Don't throw the error to prevent Strapi from failing to start
      console.log('⚠️  Bootstrap completed with errors. Please check the logs.');
    }
  },
};
