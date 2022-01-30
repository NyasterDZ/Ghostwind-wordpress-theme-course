<?php

class Primay_Menu extends Walker_Nav_Menu {
    public function start_lvl(&$output, $depth = 0, $args = []){
        $class = ($depth >= 0) ? 'p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-blue-800' : 'list-reset flex justify-between flex-1 md:flex-none items-center';
        $output .= "<ul class='".$class."' depth_".$depth.">";
    }

    public function start_el( &$output, $item, $depth = 0, $args = [], $id = 0 ){
        $classes = ($args->walker->has_children) ? 'hoverable hover:text-blue-600 mr-2' : 'mr-2';
        $item_output ='';
        $output .= "<li class='".$classes."' depth_".$depth.">";

        if($depth > 0){
            $output .= '<div class="flex items-center">';
            $output .= '<svg class="h-8 mb-3 mr-3 fill-current text-white"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z"/>
                        </svg>';
            $output .=  '<h3 class="font-bold text-xl text-white text-bold mb-2">'.$item->title.'</h3>';
            $output  .= '</div>';
            $output  .= '<p class="text-gray-100 text-sm">Quarterly sales are at an all-time low create spaces to explore the accountable talk and blind vampires.</p>';   
            $output  .= '<div class="flex items-center py-3">';   
            $output  .= '<svg class="h-6 pr-3 fill-current text-blue-300"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z"/>
                        </svg>';   
            $output .= '<a href="'.$item->url.'" class="text-white bold border-b-2 border-blue-300 hover:text-blue-300">';
            $output .= 'Find out more...';
            $output .= '</a>';
            $output .= '</div>';     
        }else {
            $output .= '<a href="'.$item->url.'">';
            $output .=  $item->title;
            $output .='</a>';
        }
    }

    public function end_el(&$output, $item, $depth = 0, $args = [], $id = 0 ){
        $output .= "</li>";
    }

    public function end_lvl(&$output, $depth = 0, $args = []){
        $output .= "</ul>";
    }
}