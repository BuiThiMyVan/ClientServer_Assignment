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
			  ,[CreateBy]			)			Values			(				@categoryParentID				,@categoryName				,@categoryDesc				,@isActive				,GETDATE()				,@createBy			)				COMMIT	END TRY	BEGIN CATCH		ROLLBACK		DECLARE @ErrorMessage varchar(2000)		SELECT @ErrorMessage = 'Error: ' + ERROR_MESSAGE()		RAISERROR(@ErrorMessage, 16, 1)	END CATCH-----END