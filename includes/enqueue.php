<?php

function gw_enqueue(){
    $url = get_theme_file_uri();
    $ver = DEV_MODE ? rand() : false;
    wp_enqueue_style('fontawesome','https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
    wp_enqueue_style('tailwindcss',$url. '/assets/css/tailwind.min.css',[],$ver);
    wp_enqueue_style('animatecss',$url. '/assets/css/animate.min.css',[],$ver);
    wp_enqueue_style('stylecss',get_stylesheet_uri(),[],$ver);
    wp_enqueue_script('popperjs',$url. '/assets/js/popper.min.js',[],$ver,true);
    wp_register_script('tippyjs',$url. '/assets/js/tippy.js',[],$ver,true);
    wp_enqueue_script('script',$url. '/assets/js/script.js',['tippyjs'],$ver,true);
}
 