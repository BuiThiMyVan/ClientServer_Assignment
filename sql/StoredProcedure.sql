﻿USE VEGETFOODS
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
--End -- Start
			  ,[CategoryName]
			  ,[CategoryDesc]
			  ,[IsActive]
			  ,[CreateTime]
			  ,[CreateBy]