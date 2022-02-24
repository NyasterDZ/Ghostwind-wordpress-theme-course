<form role="search"  method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
  <label for="search">Search for stuff</label>
  <input id="search" type="search"
        placeholder="Search..."
        value="<?php echo  esc_attr(get_search_query()); ?>" name="s"
        autofocus required />
  <button type="submit">Go</button>    
</form>