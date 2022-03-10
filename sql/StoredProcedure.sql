USE VEGETFOODSGOEXEC [dbo].[SP_CATEGORY_SEARCH] '', 0, 10, 0DROP PROC [dbo].[SP_CATEGORY_SEARCH]CREATE PROCEDURE [dbo].[SP_CATEGORY_SEARCH]
(
@txtSearch NVARCHAR(50)
-----
, @startIndex int
, @count int
, @totalItems int OUTPUT
)
As
Begin -- Start
-----
	if(@count > 0)
	Begin
	---------------------
		SET XACT_ABORT ON
		Begin Transaction

			Begin Try
				Select
				 *
				From
				(
					SELECT Row_Number() Over ( Order by cate1.[CreateTime] Desc ) as [ROWID],
							cate2.[CategoryName] AS [CategoryParentName]
							  ,cate1.[CategoryName]
							  ,cate1.[CategoryDesc]
							  ,cate1.[IsActive]
							  ,cate1.[CreateTime]
							  ,cate1.[CreateBy]
					FROM CATEGORY cate1
					LEFT JOIN CATEGORY cate2
					ON cate1.CategoryParentID = cate2.CategoryID
					WHERE 
					(
						( @txtSearch IS NULL OR @txtSearch = '' OR cate1.[CategoryName] LIKE '%' + @txtSearch + '%' )
						
					)
				) T
				Where
					[ROWID] BETWEEN (@startIndex) AND (@startIndex + @count - 1);
				
				----- @totalItems -----
				Select @totalItems 
				 = (
					SELECT Count(*)
					FROM CATEGORY cate1
					LEFT JOIN CATEGORY cate2
					ON cate1.CategoryParentID = cate2.CategoryID
					WHERE 
					(
						( @txtSearch IS NULL OR @txtSearch = '' OR cate1.[CategoryName] LIKE '%' + @txtSearch + '%' )						
					)
				);	
				
				Commit
			End Try
			Begin Catch
				RollBack
				Declare @ErrorMessage varchar(2000)
				Select @ErrorMessage = 'Error: ' + ERROR_MESSAGE()
				RAISERROR(@ErrorMessage, 16, 1)
			End Catch
		------
		End -- Begin Transaction
	---------------------
	End -- if(@count > 0)
-----
--End -- StartGOCREATE PROCEDURE [dbo].[SP_CATEGORY_GETBYID](@categoryID INT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		SELECT TOP 1 *			FROM CATEGORY cate		WHERE cate.CategoryID = @categoryID		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_CATEGORY_GETALL]ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		SELECT *		FROM CATEGORY		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_CATEGORY_DELETE](@categoryID INT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		DELETE FROM CATEGORY		WHERE [CategoryID] = @categoryID		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_CATEGORY_UPDATE](@categoryID INT,@categoryParentID INT,@categoryName NVARCHAR(60),@categoryDesc NTEXT,@isActive TINYINT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		UPDATE CATEGORY		SET [CategoryParentID] = @categoryParentID,			[CategoryName] = @categoryName,			[CategoryDesc] = @categoryDesc,			[IsActive] = @isActive,			[UpdateTime] = GETDATE()		WHERE [CategoryID] = @categoryID				COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_CATEGORY_CREATE](@categoryParentID INT,@categoryName NVARCHAR(60),@categoryDesc NTEXT,@isActive TINYINT,@createBy VARCHAR(60))ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		INSERT INTO CATEGORY			(				[CategoryParentID]
			  ,[CategoryName]
			  ,[CategoryDesc]
			  ,[IsActive]
			  ,[CreateTime]
			  ,[CreateBy]			)			Values			(				@categoryParentID				,@categoryName				,@categoryDesc				,@isActive				,GETDATE()				,@createBy			)				COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----END------------ PRODUCTALTER TABLE PRODUCT
ALTER COLUMN ProductUnit NVARCHAR(10)

CREATE PROCEDURE [dbo].[SP_PRODUCT_SEARCH]
(
@txtSearch NVARCHAR(50)
-----
, @startIndex int
, @count int
, @totalItems int OUTPUT
)
As
Begin -- Start
-----
	if(@count > 0)
	Begin
	---------------------
		SET XACT_ABORT ON
		Begin Transaction

			Begin Try
				Select
				 *
				From
				(
					SELECT Row_Number() Over ( Order by product.[CreateTime] Desc ) as [ROWID],
							product.[ProductID]
							  ,product.[ProductName]
							  ,product.[ProductUnit]
							  ,product.[ProductImages]
							  ,product.[IsActive]
							  ,product.[CreateTime]
							  ,product.[CreateBy]
					FROM PRODUCT product
					LEFT JOIN CATEGORY cate
					ON product.[ProductCategoryId] = cate.[CategoryID]
					WHERE 
					(
						( @txtSearch IS NULL OR @txtSearch = '' OR product.[ProductName] LIKE '%' + @txtSearch + '%' )
						AND ( @txtSearch IS NULL OR @txtSearch = '' OR product.[CreateBy] LIKE '%' + @txtSearch + '%' )
						AND ( @txtSearch IS NULL OR @txtSearch = '' OR product.[ProductOrigin] LIKE '%' + @txtSearch + '%' )
						
					)
				) T
				Where
					[ROWID] BETWEEN (@startIndex) AND (@startIndex + @count - 1);
				
				----- @totalItems -----
				Select @totalItems 
				 = (
					SELECT Count(*)
					FROM PRODUCT product
					LEFT JOIN CATEGORY cate
					ON product.[ProductCategoryId] = cate.[CategoryID]
					WHERE 
					(
						( @txtSearch IS NULL OR @txtSearch = '' OR product.[ProductName] LIKE '%' + @txtSearch + '%' )
						AND ( @txtSearch IS NULL OR @txtSearch = '' OR product.[CreateBy] LIKE '%' + @txtSearch + '%' )
						AND ( @txtSearch IS NULL OR @txtSearch = '' OR product.[ProductOrigin] LIKE '%' + @txtSearch + '%' )
						
					)
				);	
				
				Commit
			End Try
			Begin Catch
				RollBack
				Declare @ErrorMessage varchar(2000)
				Select @ErrorMessage = 'Error: ' + ERROR_MESSAGE()
				RAISERROR(@ErrorMessage, 16, 1)
			End Catch
		------
		End -- Begin Transaction
	---------------------
	End -- if(@count > 0)
-----
--End -- StartGOCREATE PROCEDURE [dbo].[SP_PRODUCT_GETBYID](@productID INT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		SELECT TOP 1 *			FROM PRODUCT product		WHERE product.ProductID = @productID		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_PRODUCT_DELETE](@productID INT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		DELETE FROM PRODUCT		WHERE [ProductID] = @productID		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_PRODUCT_UPDATE](@productID INT,@productCode VARCHAR(50),@productName NVARCHAR(255),@productShortName VARCHAR(255),@productCategoryId INT,@productImages NVARCHAR(MAX),@productShortDesc NVARCHAR(500),@productLongDesc NTEXT,@productUnit NVARCHAR(10),@productIngredient NVARCHAR(MAX),@productSeason NVARCHAR(50),@productEXP SMALLDATETIME,@productMFG SMALLDATETIME,@productOrigin NVARCHAR(60),@isActive TINYINT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		UPDATE PRODUCT		SET [ProductCode] = @productCode
		  ,[ProductName] = @productName
		  ,[ProductShortName] = @productShortName
		  ,[ProductCategoryId] = @productCategoryId
		  ,[ProductImages] = @productImages
		  ,[ProductShortDesc] = @productShortDesc
		  ,[ProductLongDesc] = @productLongDesc
		  ,[ProductUnit] = @productUnit
		  ,[ProductIngredient] = @productIngredient
		  ,[ProductSeason] = @productSeason
		  ,[ProductEXP] = @productEXP
		  ,[ProductMFG] = @productMFG
		  ,[ProductOrigin] = @productOrigin
		  ,[IsActive] = @isActive
		  ,[UpdateTime] = GETDATE()		WHERE [ProductID] = @productID				COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_PRODUCT_CREATE](@productID INT,@productCode VARCHAR(50),@productName NVARCHAR(255),@productShortName VARCHAR(255),@productCategoryId INT,@productImages NVARCHAR(MAX),@productShortDesc NVARCHAR(500),@productLongDesc NTEXT,@productUnit NVARCHAR(10),@productIngredient NVARCHAR(MAX),@productSeason NVARCHAR(50),@productEXP SMALLDATETIME,@productMFG SMALLDATETIME,@productOrigin NVARCHAR(60),@createBy VARCHAR(60))ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		INSERT INTO PRODUCT			(				[ProductCode]
			  ,[ProductName]
			  ,[ProductShortName]
			  ,[ProductCategoryId]
			  ,[ProductImages]
			  ,[ProductShortDesc]
			  ,[ProductLongDesc]
			  ,[ProductUnit]
			  ,[ProductIngredient]
			  ,[ProductSeason]
			  ,[ProductEXP]
			  ,[ProductMFG]
			  ,[ProductOrigin]
			  ,[IsActive]
			  ,[CreateTime]
			  ,[CreateBy]			)			Values			(				@productCode,				@productName,				@productShortName,				@productCategoryId,				@productImages,				@productShortDesc,				@productLongDesc,				@productUnit,				@productIngredient,				@productSeason,				@productEXP,				@productMFG,				@productOrigin,				1,				GETDATE(),				@createBy			)				COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDEXEC [dbo].[SP_USERCODE_IS_EXISTED] 'test123'CREATE PROCEDURE [dbo].[SP_LOGIN](@usercode VARCHAR(50),@password VARCHAR(50))ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		DECLARE @count INT		DECLARE @res BIT		SELECT @count = COUNT(*) FROM [dbo].[USER] WHERE UserCode = @usercode AND UserPassword = @password		IF @count > 0			SET @res = 1		ELSE			SET @res = 0		SELECT @res		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDCREATE PROCEDURE [dbo].[SP_USERCODE_IS_EXISTED](@usercode VARCHAR(50))ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		DECLARE @count INT		DECLARE @res BIT		SELECT @count = COUNT(*) FROM [dbo].[USER] WHERE UserCode = @usercode		IF @count > 0			SET @res = 1		ELSE			SET @res = 0		SELECT @res		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDexec [dbo].[SP_EMAIL_IS_EXISTED] 'abc@gmail.com'CREATE PROCEDURE [dbo].[SP_EMAIL_IS_EXISTED](@email VARCHAR(100))ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		DECLARE @count INT		DECLARE @res BIT		SELECT @count = COUNT(*) FROM [dbo].[USER] WHERE UserEmail = @email		IF @count > 0			SET @res = 1		ELSE			SET @res = 0		SELECT @res		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDCREATE PROCEDURE [dbo].[SP_USER_GETBYUSERCODE](@usercode VARCHAR(50))ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		SELECT * FROM [dbo].[USER] WHERE UserCode = @usercode		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDCREATE PROCEDURE [dbo].[SP_USER_CREATE](@userCode VARCHAR(50),@userEmail VARCHAR(100),@userPassword VARCHAR(50),@userFullName NVARCHAR(60),@userPhone VARCHAR(11),@userAddress NVARCHAR(200),@role INT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		INSERT INTO [dbo].[USER] (					[UserCode]
				  ,[UserEmail]
				  ,[UserPassword]
				  ,[UserFullName]
				  ,[UserRegistrationDate]
				  ,[UserPhone]
				  ,[UserAddress]
				  ,[Role]		)		VALUES(			@userCode,			@userEmail,			@userPassword,			@userFullName,			GETDATE(),			@userPhone,			@userAddress,			@role		)		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDCREATE PROCEDURE [dbo].[SP_CONSIGNMENT_GETBYPRODUCTID](@productID INT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		SELECT *		FROM CONSIGNMENT		WHERE ConsProductID = @productID		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDCREATE PROCEDURE [dbo].[SP_CONSIGNMENT_GETBYPRODUCTID](@productID INT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		SELECT *		FROM CONSIGNMENT		WHERE ConsProductID = @productID		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDCREATE PROCEDURE [dbo].[SP_CONSIGNMENT_GETBYID](@batchNo VARCHAR(20))ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		SELECT *		FROM CONSIGNMENT		WHERE BathNo = @batchNo		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDCREATE PROCEDURE [dbo].[SP_CONSIGNMENT_CREATE](@bathNo VARCHAR(20),@consProductID INT,@consProductAmout FLOAT,@IsActive TINYINT,@productEXP SMALLDATETIME)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		INSERT INTO [CONSIGNMENT] (						[BathNo]						,[ConsProductID]
					  ,[ConsProductAmout]
					  ,[IsActive]
					  ,[CreateTime]
					  ,[ProductEXP]		)		VALUES(			@bathNo,			@consProductID,			@consProductAmout,			@IsActive,			GETDATE(),			@productEXP		)		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDCREATE PROCEDURE [dbo].[SP_CONSIGNMENT_UPDATE](@bathNo VARCHAR(20),@consProductAmout FLOAT,@IsActive TINYINT,@productEXP SMALLDATETIME)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		UPDATE CONSIGNMENT		SET [ConsProductAmout] = @consProductAmout
			  ,[IsActive] = @IsActive
			  ,[UpdateTime] = GETDATE()
			  ,[ProductEXP] = @productEXP		WHERE [BathNo] = @bathNo				COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGOCREATE PROCEDURE [dbo].[SP_CONSIGNMENT_DELETE](@bathNo VARCHAR(20))ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		DELETE CONSIGNMENT		WHERE [BathNo] = @bathNo				COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----END