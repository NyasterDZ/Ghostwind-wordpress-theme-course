<?php
get_header('post');
while(have_posts()){
    the_post();
	get_template_part('template-parts/pages/content-page');
}
?>

<?php get_footer('post'); ?>