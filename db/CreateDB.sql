CREATE DATABASE MovieRate
GO;

-- CREATING TABLES
CREATE TABLE Genre (
	GenreId INT PRIMARY KEY IDENTITY(1, 1),
	GenreName NVARCHAR(32) NOT NULL
)
GO;

CREATE TABLE Studio (
	StudioId INT PRIMARY KEY IDENTITY(1, 1),
	StudioTitle NVARCHAR(128) NOT NULL,
	StudioOwner NVARCHAR(128) NOT NULL,
	Country NVARCHAR(32) NOT NULL DEFAULT 'USA'
)
GO;

CREATE TABLE Director (
	DirectorId INT PRIMARY KEY IDENTITY(1, 1),
	DirectorName NVARCHAR(128) NOT NULL
)
GO;

CREATE TABLE Distributor (
	DistributorId INT PRIMARY KEY IDENTITY(1, 1),
	DistributorTitle NVARCHAR(128) NOT NULL,
	DistributorOwner NVARCHAR(128) NOT NULL,
	SubscriptionPrice MONEY NOT NULL
)
GO;

CREATE TABLE AwardTitle (
	AwardTitleId INT PRIMARY KEY IDENTITY(1, 1),
	AwardTirle NVARCHAR(64) NOT NULL
)
GO;

CREATE TABLE Nomination (
	NominationId INT PRIMARY KEY IDENTITY(1, 1),
	NominationName NVARCHAR(128) NOT NULL
)
GO;

CREATE TABLE Movie (
	MovieId INT PRIMARY KEY IDENTITY(1, 1),
	MovieTitle NVARCHAR(128) NOT NULL,
	GenreId INT FOREIGN KEY REFERENCES Genre(GenreId),
	StudioId INT FOREIGN KEY REFERENCES Studio(StudioId),
	DirectorId INT FOREIGN KEY REFERENCES Director(DirectorId),
	DistributorId INT FOREIGN KEY REFERENCES Distributor(DistributorId)
)
GO;

CREATE TABLE Award (
	AwardId INT PRIMARY KEY IDENTITY(1, 1),
	MovieId INT FOREIGN KEY REFERENCES Movie(MovieId),
	AwardTitleId INT FOREIGN KEY REFERENCES AwardTitle(AwardTitleId),
	NominationId INT FOREIGN KEY REFERENCES Nomination(NominationId),
	AwardYear INT NOT NULL
)
GO;


CREATE TABLE AppUser (
	AppUserId INT PRIMARY KEY IDENTITY(1, 1),
	AppLogin NVARCHAR(64) NOT NULL,
	AppPassword NVARCHAR(64) NOT NULL,
	RegistrationDate DATETIME
)
GO;

-- TRIGGER FOR REGISTERING NEW USER
CREATE TRIGGER RegisterTrigger
ON AppUser
INSTEAD OF INSERT
AS
BEGIN
	INSERT AppUser (AppLogin, AppPassword, RegistrationDate)
	SELECT AppLogin, AppPassword, GETDATE() FROM inserted
END
GO;


CREATE TABLE Rate (
	RateId INT PRIMARY KEY IDENTITY(1, 1),
	MovieId INT FOREIGN KEY REFERENCES Movie(MovieId),
	AppUserId INT,
	Score INT NOT NULL
)
GO;

-- FUNCTION FOR CALCULATING AVERAGE RATE OF THE MOVIE
CREATE FUNCTION AvgRate (@MovieId INT)
RETURNS FLOAT
AS
BEGIN
	DECLARE @Res FLOAT;
	SET @Res = (SELECT AVG(Score) FROM Rate WHERE MovieId = @MovieId)
	RETURN @Res
END
GO;

-- CHECKS WHETHER LOGIN IS OCCUPIED
CREATE FUNCTION Authentify (@UserName NVARCHAR(64))
RETURNS BIT
AS
BEGIN
	IF EXISTS(SELECT AppPassword FROM AppUser WHERE AppLogin = @UserName)
		BEGIN
			RETURN 1
		END
	RETURN 0
END
GO;

-- CREATES USER
CREATE PROCEDURE CreateUser @UserLogin NVARCHAR(64) , @UserPassword NVARCHAR(64)
AS
BEGIN
	IF (dbo.Authentify(@UserLogin) = 0)
	BEGIN
		INSERT AppUser (AppLogin, AppPassword)
		VALUES (@UserLogin, @UserPassword)
	END
END
GO;

-- DELETES USER
CREATE PROCEDURE DeleteUser @UserLogin NVARCHAR(64) , @UserPassword NVARCHAR(64)
AS
BEGIN
	IF (dbo.Authentify(@UserLogin) = 1)
	BEGIN
		DELETE FROM AppUser
		WHERE AppLogin = @UserLogin
		AND AppPassword = @UserPassword
	END
END
GO;

-- AGGREGATES ALL INFORMATION ABOUT MOVIES
CREATE VIEW MoviesFullInfo
AS
SELECT MovieId,
	MovieTitle,
	M.GenreId,
	G.GenreName,
	S.StudioId,
	S.StudioTitle,
	S.StudioOwner,
	S.Country,
	D.DirectorId,
	D.DirectorName,
	Dis.DistributorId,
	Dis.DistributorTitle,
	Dis.DistributorOwner,
	Dis.SubscriptionPrice,
	dbo.AvgRate(MovieId) AS Rate
FROM Movie M
JOIN Genre G ON G.GenreId = M.GenreId
JOIN Studio S ON S.StudioId = M.StudioId
JOIN Director D ON D.DirectorId = M.DirectorId
JOIN Distributor Dis ON Dis.DistributorId = M.DistributorId
GO;


-- GETS SPECIFIC LINE FROM MOVIES FULL INFO
CREATE FUNCTION DefinedMovieInfo (@MovieId INT)
RETURNS TABLE
AS
RETURN 
	SELECT * FROM MoviesFullInfo
	WHERE MovieId = @MovieId
GO;

-- GETS MOVIES WHICH ARE TESTED BY TIME AND CONSIDERED AS CLASSIC OF CINEMATOGRAPHY
CREATE VIEW EthernalClassic
AS
SELECT * FROM dbo.DefinedMovieInfo((SELECT TOP 1 MovieId FROM Movie WHERE DirectorId =
	(SELECT TOP 1 DirectorId FROM Director WHERE DirectorName = 'Andrey Tarkovsky')))

UNION

SELECT * FROM dbo.DefinedMovieInfo((SELECT TOP 1 MovieId FROM Movie WHERE DirectorId =
	(SELECT TOP 1 DirectorId FROM Director WHERE DirectorName = 'Martin Scorsese')))
GO;

-- AGGREGATES ALL INFORMATION ABOUT AWARDS
CREATE VIEW AwardsInfo
AS
SELECT AwardId,
	M.MovieTitle,
	ATIT.AwardTirle AS 'AwardTitle',
	N.NominationName,
	A.AwardYear,
	CASE
		WHEN ATIT.AwardTirle IN ('Cannes Film Festival', 'Venice Film Festival', 'The Berlin International Film Festival') THEN 'Arthouse'
		ELSE 'Mainstream'
		END AS 'AwardType'
	FROM Award A
JOIN Movie M ON M.MovieId = A.MovieId
JOIN AwardTitle ATIT ON A.AwardCeremonyId = ATIT.AwardTitleId
JOIN Nomination N ON N.NominationId = A.NominationId
GO;

-- POSTS USER REVIEWS
CREATE PROCEDURE PostReview (@Login NVARCHAR(64), @Passwd NVARCHAR(64), @Rate INT, @MovieId INT)
AS
BEGIN
	IF EXISTS(SELECT * FROM AppUser WHERE AppLogin = @Login AND AppPassword = @Passwd)
	BEGIN
		
		DECLARE @UserId INT;
		SET @UserId = (SELECT TOP 1 AppUserId FROM AppUser WHERE AppLogin = @Login)

		IF EXISTS (SELECT * FROM Rate WHERE AppUserId = @UserId AND MovieId = @MovieId)
		BEGIN
			UPDATE Rate
			SET Score = @Rate
			WHERE AppUserId = @UserId
			AND MovieId = @MovieId
		END

		ELSE
		INSERT Rate (MovieId, AppUserId, Score)
		VALUES (@MovieId, @UserId, @Rate)
	END
END
GO;

EXEC DeleteUser 'keanu', '12345'



select * from Rate

-- DEFINE NEW USER, WHCH WILL BE USED AS A DEFAULT ENTERING POINT FOR USERS
CREATE LOGIN ReviewLogin WITH PASSWORD = 'password12';
CREATE USER ReviewUser FOR LOGIN ReviewLogin
EXEC sp_addrolemember 'db_datareader', ReviewUser
GRANT SELECT(AppLogin) ON AppUser TO ReviewUser
DENY INSERT ON AppUser TO ReviewUser
DENY DELETE TO ReviewUser
GRANT INSERT ON Rate TO ReviewUser
GRANT EXEC ON CreateUser TO ReviewUser
GRANT EXEC ON DeleteUser TO ReviewUser
GRANT EXEC ON PostReview TO ReviewUser
GRANT EXEC ON dbo.Authentify TO ReviewUser
GRANT EXEC ON dbo.AvgRate TO ReviewUser
GRANT SELECT ON EthernalClassic TO ReviewUser
GRANT SELECT ON AwardsInfo TO ReviewUser