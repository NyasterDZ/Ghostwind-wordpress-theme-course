<?php

function gw_widgets(){
    register_sidebar( [
        'name'          => 'Main Sidebar GhostWind',
        'id'            => 'gw-main-sidebar',
        'description'   => 'The main sidebar',
    ] );
}