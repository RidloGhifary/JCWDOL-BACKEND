-- 1. Find country name with most population from table country
select * from country where population = (select max(population) from country);

-- 2. Find the second one country with most population from table country
select * from country where population = 
	(select max(population) from country where population < 
    (select max(population) from country));
    
-- 3. Find country name with lowest population from table country
select * from country where population = (select min(population) from country);

-- 4. Find the third one country with lowest population from table country
select * from country order by population asc limit 1 offset 3;

-- 5. Find the largest continent by sum surface area with life expectancy more than 75
select * from country where LifeExpectancy > 75 order by SurfaceArea desc limit 1;