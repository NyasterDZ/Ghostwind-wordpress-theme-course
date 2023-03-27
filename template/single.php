<?php
get_header('post');
while(have_posts()){
    the_post();
	global $post;
	get_template_part('template-parts/posts/content-post');
}
?>

<?php get_footer('post'); ?>