<?php

function gw_customize_register($wp_customize){
    // Facebook link setting
    $wp_customize->add_setting( 'gw_social_media_facebook_setting' , array(
        'default'   => '',
    ) );

    //Facebook Tooltip Setting
    $wp_customize->add_setting( 'gw_social_media_facebook_tooltip_setting' , array(
        'default'   => 'Facebook',
    ) );

     // twitter link setting
     $wp_customize->add_setting( 'gw_social_media_twitter_setting' , array(
        'default'   => '',
    ) );

    
    // Social Media Section
    $wp_customize->add_section( 'gw_social_media_section' , array(
        'title'      => 'Social Media',
        'priority'   => 30,
    ) );


    // Facebook link input
    $wp_customize->add_control( 'gw_social_media_facebook', array(
        'label'      => 'Facebook Link',
        'section'    => 'gw_social_media_section',
        'settings'   => 'gw_social_media_facebook_setting',
    ) );

    // Facebook tooltip input
    $wp_customize->add_control( 'gw_social_media_facebook_tooltip', array(
        'label'      => 'Facebook tooltip',
        'section'    => 'gw_social_media_section',
        'settings'   => 'gw_social_media_facebook_tooltip_setting',
    ) );

    // twitter link input
    $wp_customize->add_control( 'gw_social_media_twitter', array(
        'label'      => 'Twitter Link',
        'section'    => 'gw_social_media_section',
        'settings'   => 'gw_social_media_twitter_setting',
    ) );
}