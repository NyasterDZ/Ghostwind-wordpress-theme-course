<?php

function gw_customizer_general_settings($wp_customize){
    // Lead Card
    $wp_customize->add_setting( 'gw_lead_card_setting' , array(
        'default'   => 'yes',
    ) );

    $wp_customize->add_section( 'gw_general_settings_section' , array(
        'title'      => 'General Settings',
        'priority'   => 30,
    ));

    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'gw_lead_card_checkbox',
            array(
                'label'          =>'Show the lead card',
                'section'        => 'gw_general_settings_section',
                'settings'       => 'gw_lead_card_setting',
                'type'           => 'checkbox',
                'choices'        => array(
                    'yes'   => 'Yes',
                )
            )
        )
    );

    // Dark Mode
    $wp_customize->add_setting( 'gw_dark_mode_setting' , array(
        'default'   => 'dark',
    ) );


    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'gw_dark_mode_radio',
            array(
                'label'          =>'Dark Mode',
                'section'        => 'gw_general_settings_section',
                'settings'       => 'gw_dark_mode_setting',
                'type'           => 'radio',
                'choices'        => array(
                    'dark'   => 'Dark',
                    'light'   => 'Light',
                )
            )
        )
    );
    

    // Privacy
    $wp_customize->add_setting( 'gw_privacy_setting' , array(
        'default'   => 0,
    ) );


    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'gw_privacy_page',
            array(
                'label'          =>'Choose a page',
                'section'        => 'gw_general_settings_section',
                'settings'       => 'gw_privacy_setting',
                'type'           => 'dropdown-pages',
               
            )
        )
    );

}