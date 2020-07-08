package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

type User struct {
	//stores user info
	UserID          uint   `json:"id"`
	Name            string `json:"name"`
	Email           string `json:"email"`
	Username        string `json:"username"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
	Radiojockey     string `json:"radiojockey"`
	Videojockey     string `json:"videojockey"`
}
type SongSources struct {
	//Stores Song details
	SongID     uint   `json:"id"`
	SongLink   string `json:"SongLink"`
	SongName   string `json:"SongName"`
	ArtistName string `json:"ArtistName"`
}
type RJFollowers struct {
	//stores followers for each RJ
	UserID     uint `json:"SongID"`
	FollowerID uint `json:"FollowerID"`
}
type RJAllPlaylists struct {
	// Stores Playlists of each RJ
	UserID     uint `json:"UserID"`
	PlaylistID uint `json:"PlaylistID"`
}
type PlaylistDetails struct {
	// Stores playlist details for each playlist
	PlaylistID uint `json:"PlaylistID"`
	SongID     uint `json:"SongID"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{})
	r := gin.Default()

	r.POST("/signUp/", SignUp)
	r.POST("/login/", Login)
	// r.GET("/checkUsername/:email", checkUsername)

	r.Run(":8080") // Run on port 8080
}

func SignUp(c *gin.Context) {
	// c.Header("access-control-allow-origin", "*")
	fmt.Println("SignUp called")
	var user User
	c.BindJSON(&user)
	db.Create(&user)
	c.JSON(200, user)
}

func Login(c *gin.Context) {
	var user User
	var credentials User
	c.Header("access-control-allow-origin", "*")
	c.BindJSON(&credentials)
	if err := db.Where("username = ?", credentials.Username).First(&user).Error; err != nil {
		c.JSON(250, "User Not Found")
		return
	}
	if user.Password == credentials.Password {
		c.JSON(200, user)
	} else {
		c.JSON(250, "Wrong Password")
	}
}

func checkUsername(c *gin.Context) {
	username := c.Params.ByName("Username")
	email := c.Params.ByName("email")
	var user User
	db.Where("email = ?", email).First(&user)
	if user.Email == email {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, "Email already registered")
		return
	}
	db.Where("Username = ?", username).First(&user)
	if user.Username == username {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, "Username already exists")
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(300, "ok")
}

// func DeleteQuiz(c *gin.Context) {
// 	c.Header("access-control-allow-origin", "http://localhost:3000")
// 	c.Header("access-control-allow-credentials", "true")
// 	id := c.Params.ByName("id")
// 	var quiz Quiz
// 	d := db.Where("id = ?", id).Delete(&quiz)
// 	fmt.Println(d)
// 	c.JSON(200, gin.H{"id #" + id: "deleted"})
// }

// func DeletePerson(c *gin.Context) {
// 	c.Header("access-control-allow-origin", "http://localhost:3000")
// 	c.Header("access-control-allow-credentials", "true")
// 	id := c.Params.ByName("id")
// 	var person Person
// 	d := db.Where("id = ?", id).Delete(&person)
// 	fmt.Println(d)
// 	c.JSON(200, gin.H{"id #" + id: "deleted"})
// }

// func UpdateQuestion(c *gin.Context) {
// 	var question Question
// 	id := c.Params.ByName("id")
// 	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
// 		c.AbortWithStatus(404)
// 		fmt.Println(err)
// 	}
// 	c.BindJSON(&question)
// 	db.Save(&question)
// 	c.Header("access-control-allow-origin", "*")
// 	c.JSON(200, question)
// }

// func ListPeople(c *gin.Context) {
// 	var people []Person
// 	c.Header("access-control-allow-origin", "*")
// 	// c.Header("access-control-allow-credentials", "true")
// 	if err := db.Find(&people).Error; err != nil {
// 		c.AbortWithStatus(404)
// 		fmt.Println("error = ", err)
// 	} else {
// 		c.JSON(200, people)
// 	}
// }
