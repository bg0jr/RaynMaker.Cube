
- document mission and business goals in BDD style
- start modelling initial domain model and DDD style

=================================================

# Mission

Being the landing zone of all relevant data by caching the financial world.

# Entities

- CurrencyExchange

- Asset
  - isin
  - name

- Type
  - primary name
  - secondary names

- Origin
  - name: where was this figure collected from
  - location (URI): location of the origin (optional)
  - timestamp: when collected from this site

- Figure
  - name (Type): semantical meeting of the data
  - asset: the asset this data is related to
  - origin (Origin)
  - value: the value of the figure including currency 
  - date: the data/value is related to

- Fact (non-number data)
  - name (Type): name of the fact
  - asset: the asset this data is related to
  - origin (Origin)
  - value: value of the fact

# Use cases

NO high sofisticated UIs!! just basic support.
provide API to build more sofisticated projects on top


## Collect

- Given a new Isin (list of Isins) the system collects all facts and figures.
- Given a known Isin (list of Isins) the syytem can update existing and missing facts & figures.

## Query

- Given an Isin all available data will be delivered.

## Screening

- Given various query parameters a list of matching assets is returned.

## Maintenance

- Given an fact/figure it can be deleted and manually edited.

- Given a set of figures/facts for same asset and of same types inconsistencies are reported by the system.


# Architecture

- Collecting data requires a highly parallelized batch mode which gives feedback about failures.
- Collecting data requires a guided mode which allows the user to assist/correct data collection logic.
- Query & Screening requires a human and a program interface.
- Maintenance requires a governance, reporting and editing UI.

==> focus is NOT on UI -> go for simple WPF UI (e.g. one tab per usecase section)
==> database will be LiteDB
==> use F# & actors for the backend 

=================================================

- get familiar with [LiteDB](http://www.litedb.org/)

- add first assets
  - can we download content of indices somewhere?

- add generic, simple data browser
  - just specify "key-value" pairs and get lists back

- integration RaynMaker.Import code to download data
- add currency exchange serivce


==> start all in c# portal project 
    (refactor later)




