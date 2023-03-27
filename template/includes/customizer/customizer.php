<?php

function gw_customize_register($wp_customize){
    gw_customizer_social_icons($wp_customize);
    gw_customizer_general_settings($wp_customize);
}