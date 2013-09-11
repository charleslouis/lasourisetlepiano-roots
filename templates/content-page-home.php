<?php while (have_posts()) : the_post(); ?>

  <section class="banner banner-home">
    <div class="row">
      <div class="columns">
        <div class="avatar-wrapper">
          <i aria-hidden="true" class="avatar"></i>        
        </div>
        <div class="creation-diapo">
          <h2 class="banner-title creation-diapo-title"><span>Nous créons<br/>des sites web</span><span id="moustache" class="moustache">{</span></h2>
          <ul id="creation-diapo-list" class="creation-diapo-list">
            <li><span data-hover="pérennes">mobiles</span></li>
            <li><span data-hover="responsives">pérennes</span></li>
            <li><span data-hover="rentables">accessibles</span></li>
            <li><span data-hover="responsables">responsives</span></li>
            <li><span data-hover="accessibles">responsables</span></li>
            <!-- <li><span data-hover="internets">rentables</span></li> -->
          </ul>
        </div>          
      </div>
    </div><!-- row -->
  </section><!-- banner -->
  
  <!--  Row for main content area -->
  <div class="main main-home row" role="main">
    <div class="columns">    
    
    <section class="presentation">
      <header class="presentation-header">
        <h1><?php the_field('title'); ?></h1>        
        <h3><?php the_field('subtitle'); ?></h3>
      </header>
      <p class="leader presentation-prose"><?php the_field('paragraph_leader'); ?></p>
    </section><!--  /.presentation -->

<?php endwhile; // End the loop ?>