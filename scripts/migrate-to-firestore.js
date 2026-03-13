#!/usr/bin/env node
/**
 * Script de Migración: WordPress JSON → Firebase Firestore
 * Uso: node migrate-to-firestore.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// ========== CONFIGURACIÓN ==========

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-service-account.json';
const dataSourcePath = process.env.WP_DATA_PATH || './wordpress_data_final.json';

// ========== INICIALIZACIÓN ==========

console.log('🔥 Inicializando Firebase Admin SDK...');

try {
  // Opción 1: Si tienes archivo de credenciales de servicio
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    // Opción 2: Usar credenciales del entorno en Vercel/producción
    admin.initializeApp();
  }
} catch (error) {
  console.error('❌ Error inicializando Firebase:');
  console.error('   Opción 1: Proporciona FIREBASE_SERVICE_ACCOUNT_PATH con archivo JSON');
  console.error('   Opción 2: Usa credenciales de entorno en producción');
  process.exit(1);
}

const db = admin.firestore();

// ========== CARGAR DATOS ==========

console.log(`\n📂 Cargando datos de WordPress desde: ${dataSourcePath}`);

let wpData;
try {
  const fullPath = path.resolve(__dirname, dataSourcePath);
  wpData = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  console.log(`✅ Datos cargados: ${wpData.posts.length} posts, ${wpData.pages.length} páginas`);
} catch (error) {
  console.error('❌ Error cargando archivo JSON:', error.message);
  process.exit(1);
}

// ========== FUNCIONES DE MIGRACIÓN ==========

async function migratePosts() {
  console.log('\n📝 Migrando Posts...');
  let success = 0;
  let failed = 0;

  for (const post of wpData.posts) {
    try {
      await db.collection('posts').doc(post.id.toString()).set({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content_preview || '',
        contentLength: post.content_length || 0,
        date: post.date,
        type: post.type,
        status: post.status,
        published: post.status === 'publish',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: [],
        category: 'blog',
      });
      success++;
    } catch (error) {
      console.error(`   ❌ Error en post ${post.id}:`, error.message);
      failed++;
    }
  }

  console.log(`   ✅ Posts: ${success} exitosos, ${failed} fallidos`);
  return { success, failed };
}

async function migratePages() {
  console.log('\n📄 Migrando Páginas...');
  let success = 0;
  let failed = 0;

  for (const page of wpData.pages) {
    try {
      await db.collection('pages').doc(page.id.toString()).set({
        id: page.id,
        title: page.title,
        slug: page.slug,
        content: page.content_preview || '',
        contentLength: page.content_length || 0,
        date: page.date,
        type: page.type,
        status: page.status,
        published: page.status === 'publish',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      success++;
    } catch (error) {
      console.error(`   ❌ Error en página ${page.id}:`, error.message);
      failed++;
    }
  }

  console.log(`   ✅ Páginas: ${success} exitosos, ${failed} fallidos`);
  return { success, failed };
}

async function migrateTestimonials() {
  console.log('\n⭐ Migrando Testimonios...');
  let success = 0;
  let failed = 0;

  const testimonials = [
    {
      id: 'walter-calvar',
      name: 'Walter Calvar',
      position: 'Gerente Comercial LATAM',
      company: 'Ovobrand S.A.',
      text: 'Cumplimiento, empatía y creatividad. He tenido la oportunidad de colaborar con el equipo de Estudio Creativo MD en varios proyectos y lo que más me ha impresionado es su capacidad para cumplir con los plazos establecidos y superar las expectativas del cliente. Su principal característica es el compromiso: siempre se esfuerzan por entregar resultados de alta calidad y en el tiempo acordado.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      date: new Date('2024-04-01'),
    },
  ];

  for (const testimonial of testimonials) {
    try {
      await db.collection('testimonials').doc(testimonial.id).set({
        ...testimonial,
        createdAt: new Date(),
        published: true,
      });
      success++;
    } catch (error) {
      console.error(`   ❌ Error en testimonio ${testimonial.id}:`, error.message);
      failed++;
    }
  }

  console.log(`   ✅ Testimonios: ${success} exitosos, ${failed} fallidos`);
  return { success, failed };
}

async function createSiteConfig() {
  console.log('\n⚙️  Creando configuración del sitio...');

  try {
    await db.collection('config').doc('site').set({
      name: 'Estudio Creativo de Marketing Digital',
      description: 'Estrategia de agencia, agilidad freelance',
      url: 'https://creativomarketingdigital.com',
      email: 'estudio@creativomarketingdigital.com',
      phone: '+57 316 691 8444',
      social: {
        facebook: 'https://facebook.com/studiocreativomd',
        instagram: 'https://instagram.com/studiocreativomd',
      },
      updatedAt: new Date(),
    });
    console.log('   ✅ Configuración creada');
  } catch (error) {
    console.error('   ❌ Error creando configuración:', error.message);
  }
}

// ========== EJECUCIÓN ==========

async function runMigration() {
  console.log('\n' + '='.repeat(70));
  console.log('🚀 INICIANDO MIGRACIÓN: WORDPRESS → FIRESTORE');
  console.log('='.repeat(70));

  const startTime = Date.now();

  try {
    const postsResult = await migratePosts();
    const pagesResult = await migratePages();
    const testimonialsResult = await migrateTestimonials();
    await createSiteConfig();

    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n' + '='.repeat(70));
    console.log('✅ MIGRACIÓN COMPLETADA');
    console.log('='.repeat(70));
    console.log(`\nResultados:
  📝 Posts:        ${postsResult.success} ✅, ${postsResult.failed} ❌
  📄 Páginas:      ${pagesResult.success} ✅, ${pagesResult.failed} ❌
  ⭐ Testimonios:  ${testimonialsResult.success} ✅, ${testimonialsResult.failed} ❌
  
  ⏱️  Tiempo total: ${totalTime}s
  🔗 Proyecto:     sitio-web-creativo-md
    `);

    console.log('\n📊 Próximos pasos:');
    console.log('  1. Verifica los datos en Firebase Console');
    console.log('  2. Consulta /app/blog/page.tsx para conectar la UI');
    console.log('  3. Implementa queries de Firestore en lib/firestore-queries.ts');
    console.log('  4. Sube imágenes a Firebase Storage\n');

  } catch (error) {
    console.error('\n❌ Error fatal en migración:', error);
    process.exit(1);
  } finally {
    // Cerrar conexión
    await admin.app().delete();
    console.log('✅ Desconectado de Firebase\n');
  }
}

// Ejecutar
runMigration().catch(error => {
  console.error('Error no manejado:', error);
  process.exit(1);
});
