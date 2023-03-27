<?php

function gw_setup_theme(){
    register_nav_menu('menu', 'Primary Menu GhostWind');
    register_nav_menu('menu2', 'Footer menu');
    register_nav_menu('menu3', 'Single Post Menu');
    add_theme_support( 'post-thumbnails' ); 
    add_theme_support( 'title-tag' ); 
    show_admin_bar(false);
 }