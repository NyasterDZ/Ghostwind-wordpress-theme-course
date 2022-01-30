<?php

function gw_setup_theme(){
    register_nav_menu('menu', 'Primary Menu GhostWind');
    register_nav_menu('menu2', 'Footer menu');
    add_theme_support( 'post-thumbnails' ); 
 }