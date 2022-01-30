<?php

function gw_change_menu_class_li( $classes, $item, $args ) {
 
    if ( 'menu' === $args->theme_location ) {
        $classes[] = "hoverable hover:text-white mr-2";
    }
 
    return $classes;
}

function gw_change_menu_class_anchor( $atts, $item, $args ) {
    // check if the item is in the primary menu
    if( $args->theme_location == 'menu' ) {
      // add the desired attributes:
      $atts['class'] = 'inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-2';
    }
    return $atts;
}

function gw_change_menu_footer_class_anchor( $atts, $item, $args ) {
    // check if the item is in the primary menu
    if( $args->theme_location == 'menu2' ) {
      // add the desired attributes:
      $atts['class'] = 'inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-3';
    }
    return $atts;
}
