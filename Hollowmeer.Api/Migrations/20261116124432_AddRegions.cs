using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hollowmeer.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddRegions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Region",
                table: "Beasts");

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Beasts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Regions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Beasts_RegionId",
                table: "Beasts",
                column: "RegionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Beasts_Regions_RegionId",
                table: "Beasts",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Beasts_Regions_RegionId",
                table: "Beasts");

            migrationBuilder.DropTable(
                name: "Regions");

            migrationBuilder.DropIndex(
                name: "IX_Beasts_RegionId",
                table: "Beasts");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Beasts");

            migrationBuilder.AddColumn<string>(
                name: "Region",
                table: "Beasts",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
