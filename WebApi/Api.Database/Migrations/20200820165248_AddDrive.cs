using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Database.Migrations
{
    public partial class AddDrive : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DriveId",
                table: "UserAccounts",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Drives",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GroupId = table.Column<int>(nullable: true),
                    DriverId = table.Column<int>(nullable: true),
                    DistanceInKm = table.Column<int>(nullable: false),
                    DurationInSeconds = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drives", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Drives_UserAccounts_DriverId",
                        column: x => x.DriverId,
                        principalTable: "UserAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Drives_UserGroups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "UserGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAccounts_DriveId",
                table: "UserAccounts",
                column: "DriveId");

            migrationBuilder.CreateIndex(
                name: "IX_Drives_DriverId",
                table: "Drives",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Drives_GroupId",
                table: "Drives",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAccounts_Drives_DriveId",
                table: "UserAccounts",
                column: "DriveId",
                principalTable: "Drives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAccounts_Drives_DriveId",
                table: "UserAccounts");

            migrationBuilder.DropTable(
                name: "Drives");

            migrationBuilder.DropIndex(
                name: "IX_UserAccounts_DriveId",
                table: "UserAccounts");

            migrationBuilder.DropColumn(
                name: "DriveId",
                table: "UserAccounts");
        }
    }
}
