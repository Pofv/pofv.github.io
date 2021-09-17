
Select *
From CovidData.dbo.CovidVac$
order by 3,4

Select *
From CovidData.dbo.CovidDeaths$
order by 3,4

-- Cases per 100k by latest date available
Select Location, Population, Max(total_cases/population)*1000 as 'Cases_per_1,000'
From CovidData.dbo.CovidDeaths$
where continent is not NULL
Group by Location, Population
Order by 'Cases_per_1,000' desc	

-- Ordered death rate of every country
Select * From (
	Select Location, Population,
		(total_deaths/total_cases) as 'Cumulative Death Rate', 
		row_number() over(partition by Location order by date desc) as rn
	From CovidData.dbo.CovidDeaths$
	where continent is not NULL
) t
where t.rn = 1
order by 'Cumulative Death Rate' desc

-- Percent fully vaccinated of countries
Select * From (
	Select d.Continent, d.Location, d.Date, d.Population, 
	Cast(v.people_fully_vaccinated_per_hundred as decimal(6,2)) as 'Percent Fully Vaccinated',
	row_number() over(partition by d.Location order by d.Date desc) as rn
	From CovidData.dbo.CovidVac$ v Join CovidData.dbo.CovidDeaths$ d
	On d.Location = v.Location and d.Date = v.Date
	Where d.Continent is not NULL
	--order by 2, 3
) t
where t.rn = 1
order by 'Percent Fully Vaccinated' desc

-- Average of vaccination per person ranked by country
With Vac (Continent, Location, Date, Population, TotalVaccinated, rn)
as (
	Select d.Continent, d.Location, d.Date, d.Population,
	Sum(Cast(v.new_vaccinations as int)) over (Partition by d.Location Order by d.Location, d.Date) as TotalVaccinated,
	row_number() over(partition by d.Location order by d.date desc) as rn
	From CovidData.dbo.CovidVac$ v Join CovidData.dbo.CovidDeaths$ d
	On d.Location = v.Location and d.Date = v.Date
	Where d.Continent is not NULL
)
Select *, (t.TotalVaccinated/t.Population) as AverageVaccinated
From Vac t
Where t.rn = 1
Order by AverageVaccinated desc

-- Temp Table
Drop Table if exists #BedsvsDeathRate
Create Table #BedsvsDeathRate (
Location varchar(50),
Date datetime,
Population int,
BedsPerThousand decimal(8,5),
DeathRate decimal(16,10)
)

Insert into #BedsvsDeathRate
Select d.Location, d.Date, d.Population, v.hospital_beds_per_thousand as BedsPerThousand, 
(d.total_deaths/d.total_cases) as DeathRate
From CovidData.dbo.CovidVac$ v Join CovidData.dbo.CovidDeaths$ d
On d.Location = v.Location and d.Date = v.Date
Where d.Continent is not NULL 
and d.total_cases != 0
and d.total_cases != 0
and v.hospital_beds_per_thousand is not NULL
--Order by d.Location

Select * From (
Select Location, Date, BedsPerThousand, DeathRate, row_number() over(partition by Location order by Date desc) as rn
From #BedsvsDeathRate
) t
Where t.rn = 1
Order by Location

-- Make a view
Use CovidData

Create or Alter View dbo.CasesPer100k as (
Select Location, Date, New_Cases, Total_Cases, Population
From CovidData.dbo.CovidDeaths$
Where Continent is not NULL
--order by 1,2
)