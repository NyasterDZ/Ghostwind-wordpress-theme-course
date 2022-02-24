<div class="main-sidebar border border-indigo-600 p-3">
    <div class="my-3">
        <?php get_search_form();?>
    </div>
    <?php
        if(is_active_sidebar('gw-main-sidebar')){
            dynamic_sidebar('gw-main-sidebar');
        }
    ?>
</div>