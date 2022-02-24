<?php

function gw_widgets(){
    register_sidebar( [
        'name'          => 'Main Sidebar GhostWind',
        'id'            => 'gw-main-sidebar',
        'description'   => 'The main sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
    ] );
}