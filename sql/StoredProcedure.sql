USE VEGETFOODSGOEXEC [dbo].[SP_CATEGORIES_SEARCH] '', 0, 10, 0DROP PROC [dbo].[SP_CATEGORIES_SEARCH]CREATE PROCEDURE [dbo].[SP_CATEGORIES_SEARCH]
(
@categoryName NVARCHAR(50)
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
					SELECT Row_Number() Over ( Order by [CreateTime] Desc ) as [ROWID],
							[CategoryParentID]
							  ,[CategoryName]
							  ,[CategoryDesc]
							  ,[IsActive]
							  ,[CreateTime]
							  ,[CreateBy]
					FROM CATEGORIES
					WHERE 
					(
						( @categoryName IS NULL OR @categoryName = '' OR [CategoryName] LIKE '%' + @categoryName + '%' )
						
					)
				) T
				Where
					[ROWID] BETWEEN (@startIndex) AND (@startIndex + @count - 1);
				
				----- @totalItems -----
				Select @totalItems 
				 = (
					SELECT Count(*)
					FROM CATEGORIES
					WHERE 
					(
						( @categoryName IS NULL OR @categoryName = '' OR [CategoryName] LIKE '%' + @categoryName + '%' )
						
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
--End -- StartGOCREATE PROCEDURE [dbo].[SP_CATEGORIES_GETBYID](@categoryID INT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		SELECT TOP 1 *			FROM CATEGORIES cate		WHERE cate.CategoryID = @categoryID		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_CATEGORIES_GETALL]ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		SELECT *		FROM CATEGORIES		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_CATEGORIES_DELETE](@categoryID INT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		DELETE FROM CATEGORIES		WHERE [CategoryID] = @categoryID		COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_CATEGORIES_UPDATE](@categoryID INT,@categoryParentID INT,@categoryName NVARCHAR(60),@categoryDesc NTEXT,@isActive TINYINT)ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		UPDATE CATEGORIES		SET [CategoryParentID] = @categoryParentID,			[CategoryName] = @categoryName,			[CategoryDesc] = @categoryDesc,			[IsActive] = @isActive,			[UpdateTime] = GETDATE()		WHERE [CategoryID] = @categoryID				COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----ENDGO-- Begin TransactionCREATE PROCEDURE [dbo].[SP_CATEGORIES_CREATE](@categoryID INT,@categoryParentID INT,@categoryName NVARCHAR(60),@categoryDesc NTEXT,@isActive TINYINT,@createBy VARCHAR(60))ASBEGIN-----SET XACT_ABORT ONBEGIN TRANSACTION	BEGIN TRY		INSERT INTO CATEGORIES			(				[CategoryParentID]
			  ,[CategoryName]
			  ,[CategoryDesc]
			  ,[IsActive]
			  ,[CreateTime]
			  ,[CreateBy]			)			Values			(				@categoryParentID				,@categoryName				,@categoryDesc				,@isActive				,GETDATE()				,@createBy			)				COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----END