INSERT Genre (GenreName)
VALUES ('Action'),
	('Adventure'),
	('Drama'),
	('Sci-fi'),
	('Cartoon'),
	('Thriller'),
	('Horror'),
	('Fantasy'),
	('Sports'),
	('Comedy'),
	('Melodrama'),
	('Fantastic')

INSERT AwardCeremony (AwardTirle)
VALUES ('Oscar'),
	('BAFTA'),
	('Cannes Film Festival'),
	('Golden Globe'),
	('The Berlin International Film Festival'),
	('Filmfare Awards'),
	('European Film Awards'),
	('Locarno International Film Festival '),
	('Venice Film Festival'),
	('European Film Awards')

INSERT Nomination (NominationName)
VALUES ('Palme D’Or'),
	('Best Film'),
	('Best Soundtrack'),
	('Best Director'),
	('The Golden Bear '),
	('The Golden Leopard'),
	('Grand Jury Prize'),
	('Golden Lion'),
	('Best VFX'),
	('Best Cinematography')

INSERT Director (DirectorName)
VALUES ('Denis Villeneuve'),
	('Martin Scorsese'),
	('Quentin Tarantino'),
	('Guy Ritchie'),
	('Christopher Nolan'),
	('Taika Waititi'),
	('Stanley Kubrick'),
	('Andrey Tarkovsky'),
	('Lars von Trier'),
	('Steven Spielberg'),
	('Todd Philips')

INSERT Studio (StudioTitle, StudioOwner, Country)
VALUES ('Marvel Studios', 'Disney', 'USA'),
	('20 Century Fox', 'Disney', 'USA'),
	('Columbia Pictures', 'Sony', 'USA'),
	('Bollywood', 'Eros International Plc', 'India'),
	('New Line Cinema', 'WarnerMedia', 'USA'),
	('Paramount Pictures', 'ViacomCBS', 'USA'),
	('Universal Pictures', 'NBCUniversal', 'USA'),
	('Lionsgate Films', 'Lionsgate Motion Picture Group', 'USA'),
	('Gaumont Film Company', 'Gamount', 'France'),
	('Constantin Film', 'Highlight Communications', 'Germany'),
	('DC Films', 'WarnerMedia', 'USA'),
	('Mosfilm', 'Goskino', 'USSR'),
	('Miramax', 'STX Entertainment', 'USA'),
	('Syncopy Films', 'WarnerMedia', 'USA')

INSERT Distributor (DistributorTitle, DistributorOwner, SubscriptionPrice)
VALUES ('CBS All Access', 'ViacomCBS', 5.99),
	('Hulu', 'Disney', 5.99),
	('Prime Video', 'Amazon', 8.99),
	('Netflix', 'Netflix Inc.', 8.99),
	('Starz', 'Lionsgate', 8.99),
	('Showtime', 'CBS Corporation', 10.99),
	('HBO Max', 'WarnerMedia', 14.99),
	('Disney+', 'Disney', 6.99),
	('Megogo', 'Megogo', 4.99),
	('Peacock', 'NBC', 4.99)

INSERT Movie (MovieTitle, GenreId, StudioId, DirectorId, DistributorId)
VALUES ('Joker', 3, 11, 11, 7),
	('Taxi Driver', 6, 3, 2, 3),
	('Blade Runner 2049', 4, 3, 1, 4),
	('Stalker', 12, 12, 8, 9),
	('Gentlemen', 1, 13, 4, 2),
	('Tenet', 1, 14, 5, 7),
	('Thor 3', 1, 1, 6, 8),
	('Once Upon a Time in Hollywood', 3, 3, 3, 4),
	('Bridge of Spies', 3, 2, 10, 3),
	('Sicario', 6, 8, 1, 4)



INSERT Awards (MovieId, AwardCeremonyId, NominationId, AwardYear)
VALUES (2, 3, 1, 1976),
	(3, 1, 9, 2018),
	(3, 1, 10, 2018),
	(1, 1, 3, 2020),
	(1, 4, 3, 2020),
	(4, 3, 1, 1980),
	(6, 1, 2, 2021),
	(6, 1, 3, 2021),
	(6, 1, 4, 2021),
	(6, 4, 2, 2021)
