<?php

function gw_change_menu_class_li( $classes, $item, $args ) {
 
    if ( 'menu3' === $args->theme_location ) {
        $classes[] = "mr-2";
    }
 
    return $classes;
}

function gw_change_menu_class_anchor( $atts, $item, $args ) {
    // check if the item is in the primary menu
    if( $args->theme_location == 'menu3' ) {
      // add the desired attributes:
      $atts['class'] = 'inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-2';
    }
    return $atts;
}

function gw_change_menu_footer_class_anchor( $atts, $item, $args ) {

    if( $args->theme_location == 'menu2' ) {
     
      $atts['class'] = 'inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-3';
    }
    return $atts;
}
