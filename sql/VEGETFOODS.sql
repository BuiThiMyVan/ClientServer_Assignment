--CREATE DATABASE VEGETFOODS

USE VEGETFOODS

CREATE TABLE CATEGORIES (
	CategoryID INT IDENTITY(1,1) PRIMARY KEY,
	CategoryParentID INT,
	CategoryName NVARCHAR(60),
	CategoryShortName VARCHAR(60),
	CategoryDesc NTEXT,
	IsActive TINYINT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
)

CREATE TABLE PRODUCTS (
	ProductID INT IDENTITY(1,1) PRIMARY KEY,
	ProductCode VARCHAR(50),
	ProductName NVARCHAR(255),
	ProductShortName VARCHAR(255),
	ProductCategoryId INT,
	ProductImages NVARCHAR(MAX),
	ProductShortDesc NVARCHAR(500),
	ProductLongDesc NTEXT,	
	ProductUnit VARCHAR(10),
	ProductIngredient NVARCHAR(MAX),
	ProductSeason NVARCHAR(50),
	ProductEXP SMALLDATETIME,
	ProductMFG SMALLDATETIME,
	ProductOrigin NVARCHAR(60),	
	IsActive TINYINT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
	FOREIGN KEY(ProductCategoryId) REFERENCES CATEGORIES(CategoryID)
)

CREATE TABLE CONSIGNMENTS(
	BathNo VARCHAR(20) PRIMARY KEY,
	ConsProductID INT,
	ConsProductAmout FLOAT,
	ConsProductPrice FLOAT,
	IsActive TINYINT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
	FOREIGN KEY(ConsProductID) REFERENCES PRODUCTS(ProductID)
)

CREATE TABLE USERS(
	UserCode VARCHAR(50) PRIMARY KEY,	
	UserEmail VARCHAR(100),
	UserPassword VARCHAR(50),
	UserFullName NVARCHAR(60),
	UserEmailVerified TINYINT,
	UserRegistrationDate SMALLDATETIME,
	UserVerifiactionCode VARCHAR(20),
	UserAvatar NVARCHAR(MAX),
	UserPhone VARCHAR(11),
	UserAddress NVARCHAR(200)
)

CREATE TABLE PERMISSION (
	PerID INT IDENTITY(1,1) PRIMARY KEY,
	PerName NVARCHAR(50),
	IsActive TINYINT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
)

CREATE TABLE PERMISSION_DETAIL (
	DetailID INT IDENTITY(1,1) PRIMARY KEY,
	PerID INT,
	ActionName NVARCHAR(50),
	ActionCode VARCHAR(50),
	IsActive TINYINT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
	FOREIGN KEY(PerID) REFERENCES PERMISSION(PerID)

)


CREATE TABLE USER_PERMISSION (
	UserPerID INT IDENTITY(1,1) PRIMARY KEY,
	PerID INT,
	UserCode VARCHAR(50),
	FOREIGN KEY(UserCode) REFERENCES USERS(UserCode),
	FOREIGN KEY(PerID) REFERENCES PERMISSION(PerID),
)

CREATE TABLE ORDERS (
	OrderID INT IDENTITY(1,1) PRIMARY KEY,
	OrderUserCode VARCHAR(50),
	OrderShipAddress NVARCHAR(200),
	OrderPhone NVARCHAR(11),
	OrderShippingFee FLOAT,
	OrderShippingNote NVARCHAR(200),
	OrderStatus TINYINT,
	OrderEmail NVARCHAR(100),
	OrderPayMethod INT,
	OrderTotal INT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
	FOREIGN KEY(OrderUserCode) REFERENCES USERS(UserCode)
)

CREATE TABLE ORDER_DETAIL(
	DetailID INT IDENTITY(1,1) PRIMARY KEY,
	DetailProductID INT,
	DetailOrderID INT,
	DetailPrice FLOAT,
	DetailQuantity INT,
	DetailSKU VARCHAR(50),
	DetailRate FLOAT,
	DetailComment NVARCHAR(200),
	FOREIGN KEY(DetailProductID) REFERENCES PRODUCTS(ProductID),
	FOREIGN KEY(DetailOrderID) REFERENCES ORDERS(OrderID)
)

CREATE TABLE DISCOUNTS (
	DiscountID INT IDENTITY(1,1) PRIMARY KEY,
	DiscountName NVARCHAR(100),
	DiscountDesc NVARCHAR(500),
	DiscountPercent FLOAT,
	IsActive TINYINT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
)

CREATE TABLE SHOPPING_SESSIONS (
	SessionID INT IDENTITY(1,1) PRIMARY KEY,
	UserCode VARCHAR(50),
	Total FLOAT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
	FOREIGN KEY(UserCode) REFERENCES USERS(UserCode),
)

CREATE TABLE CART_ITEM (
	CartItemId INT IDENTITY(1,1) PRIMARY KEY,
	SessionID INT,
	ProductID INT,
	Quantity INT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
	FOREIGN KEY(SessionID) REFERENCES SHOPPING_SESSIONS(SessionID),
)

ALTER TABLE DISCOUNTS
ADD Products NVARCHAR(50)

CREATE TABLE PROVINCES (
	ProvinceID CHAR(2) PRIMARY KEY,
	ProvinceName NVARCHAR(50)
)

CREATE TABLE DISTRICTS (
	DistrictID CHAR(3) PRIMARY KEY,
	DistrictName NVARCHAR(60),
	ProvinceID CHAR(2),
	FOREIGN KEY(ProvinceID) REFERENCES PROVINCES(ProvinceID)
)

CREATE TABLE TOWNS (
	TownID VARCHAR(5) PRIMARY KEY,
	TownName NVARCHAR(60),
	DistrictID CHAR(3),
	FOREIGN KEY(DistrictID) REFERENCES DISTRICTS(DistrictID)
)

CREATE TABLE NEWSCATEGORIES (
	NewsCateID INT IDENTITY(1,1) PRIMARY KEY,
	NewsCateTitle NVARCHAR(200),
	NewsDesc NVARCHAR(500),
	IsActive TINYINT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
)

CREATE TABLE NEWS (
	NewsID INT IDENTITY(1,1) PRIMARY KEY,
	NewsCateID INT,
	NewsTitle NVARCHAR(200),
	NewsImages NVARCHAR(MAX),
	NewsSummary NVARCHAR(300),
	NewsBody NTEXT,
	IsActive TINYINT,
	CreateTime SMALLDATETIME,
	UpdateTime SMALLDATETIME,
	FOREIGN KEY(NewsCateID) REFERENCES NEWSCATEGORIES(NewsCateID)
)

CREATE TABLE NEWSCOMMENTS(
	CmtID INT IDENTITY(1,1) PRIMARY KEY,
	NewsID INT,
	UserCode VARCHAR(50),
	Content NTEXT,
	CreateDate SMALLDATETIME
)

ALTER TABLE PRODUCTS
ADD CreateBy VARCHAR(60)

ALTER TABLE CATEGORIES
ADD CreateBy VARCHAR(60)

ALTER TABLE CATEGORIES
DROP COLUMN CategoryShortName