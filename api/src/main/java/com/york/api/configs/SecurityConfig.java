package com.york.api.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authz -> authz
                .requestMatchers("/", "/index.html", "/static/**",
                        "/*.ico", "/*.json", "/*.png", "/api/user",
                        "/login/oauth2/code/okta", "/api/logout")
                .permitAll().anyRequest().authenticated());
        http.csrf(csrf -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler()));
        http.addFilterAfter(new CookieCsrfFilter(), BasicAuthenticationFilter.class);
        http.oauth2Login(oauth2 -> oauth2
                .defaultSuccessUrl("/", true));
        return http.build();

    }
}
