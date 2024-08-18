package com.app;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.app.dto.CinemaHallDTO;
import com.app.dto.ShowDTO;
import com.app.entities.CinemaHall;
import com.app.entities.Show;

@SpringBootApplication
public class CinepulseApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinepulseApplication.class, args);
	}
   
	@Bean
	public ModelMapper modelMapper() {
	    ModelMapper modelMapper = new ModelMapper();
	    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT)
	        .setPropertyCondition(Conditions.isNotNull());

	    

	    // Add custom mappings for Show to ShowDTO
	    modelMapper.addMappings(new PropertyMap<Show, ShowDTO>() {
	        @Override
	        protected void configure() {
	            map().setMovieId(source.getCinemaHall().getMovie().getMovieId());
	            map().setCinemaHallId(source.getCinemaHall().getCinemaHallId());
	        }
	    });
	    
	    modelMapper.typeMap(CinemaHall.class, CinemaHallDTO.class).addMappings(mapper -> {
	        mapper.map(src -> src.getMovie().getMovieId(), CinemaHallDTO::setMovieId);
	    });
	    
	    modelMapper.typeMap(CinemaHall.class, CinemaHallDTO.class).addMappings(mapper -> {
	    	mapper.map(src->src.getCinemaHallId(), CinemaHallDTO::setId);
	    });
	    

	    return modelMapper;
	}


	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173") // Your frontend URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
