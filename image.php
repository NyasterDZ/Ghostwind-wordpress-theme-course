<?php

while(have_posts()){
    the_post(); ?>

<img width="800" height="500" src="<?php echo $post->guid; ?>" alt="">    

<?php    
}