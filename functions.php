<?php

define('DEV_MODE',true);

// Functions
require(get_theme_file_path('includes/enqueue.php'));
require(get_theme_file_path('includes/setup.php'));
require(get_theme_file_path('includes/custom_excerpt.php'));
require(get_theme_file_path('includes/change_menu_classes.php'));
require(get_theme_file_path('includes/widgets.php'));
require(get_theme_file_path('includes/classes/walker.php'));
require(get_theme_file_path('includes/classes/walker_comments.php'));
require(get_theme_file_path('includes/customizer/customizer.php'));
require(get_theme_file_path('includes/customizer/social_icons.php'));
require(get_theme_file_path('includes/customizer/general_settings.php'));
  
// Action Hooks
add_action('wp_enqueue_scripts','gw_enqueue');
add_action('after_setup_theme','gw_setup_theme');
add_action( 'widgets_init', 'gw_widgets' );
add_action( 'customize_register', 'gw_customize_register' );

//Filter hooks
add_filter( 'nav_menu_css_class' , 'gw_change_menu_class_li' , 10, 3 );
add_filter( 'nav_menu_link_attributes', 'gw_change_menu_class_anchor', 10, 3 );
add_filter( 'nav_menu_link_attributes', 'gw_change_menu_footer_class_anchor', 10, 3 );
add_filter( 'excerpt_length', 'gw_custom_excerpt_length', 999 );

