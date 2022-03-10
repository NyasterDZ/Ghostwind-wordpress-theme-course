<?php

function gw_customize_register($wp_customize){
    $wp_customize->add_setting( 'gw_social_media_facebook_setting' , array(
        'default'   => '',
        'transport' => 'refresh',
    ) );
    
    $wp_customize->add_section( 'gw_social_media_section' , array(
        'title'      => 'Social Media',
        'priority'   => 30,
    ) );

    $wp_customize->add_control( 'gw_social_media_facebook', array(
        'label'      => 'Facebook Link',
        'section'    => 'gw_social_media_section',
        'settings'   => 'gw_social_media_facebook_setting',
    ) );
}