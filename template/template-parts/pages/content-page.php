	
	<!--Title-->
	<div class="text-center pt-16 md:pt-32">
		<p class="text-sm md:text-base text-green-500 font-bold"><?php the_date()?> <span class="text-gray-900">/</span> <?php echo get_the_author() ?></p>
		<h1 class="font-bold break-normal text-3xl md:text-5xl"><?php echo get_the_title(); ?></h1>
	</div>

	<!--image-->
	<div class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded" style="background-image:url('<?php echo (has_post_thumbnail()) ? get_the_post_thumbnail_url() : get_theme_file_uri("assets/img/default_image.png") ?>'); height: 75vh;"></div>
	
	<!--Container-->
	<div class="container max-w-5xl mx-auto -mt-32">
		
		<div class="mx-0 sm:mx-6">
			
			<div class="mb-5 bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">
				
                <?php the_content() ?>
						
			</div>

           	<!--Author-->
				<div class="flex w-full items-center font-sans p-12 md:p-12">
					<?php 
						$author = get_the_author();
						echo get_avatar(get_the_author_meta( 'ID' ), 96,  '',  '', [
							'class' => 'w-10 h-10 rounded-full mr-4',
							'alt' => 'Avatar of Author',
							'extra_attr' => "data-tippy-content=$author"
						]); ?>
					<div class="flex-1">
						<p class="text-base font-bold text-base md:text-xl leading-none"><?php echo get_the_author() ?></p>
						<p class="text-gray-600 text-xs md:text-base"><?php echo get_the_author_meta( 'description' )?></p>
					</div>
					<div class="justify-end">
						<button class="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Follow</button>
					</div>
				</div>
				<!--/Author-->

			<?php
			if ( comments_open() || get_comments_number() ) {
				comments_template();
			}
			?>	
		</div>
	</div>
	
