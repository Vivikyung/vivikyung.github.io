<!DOCTYPE html>
<html>
<head>
    <script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
    <script type="text/javascript" src="{{ url_for('static', filename = 'layout.js') }}"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">

    <style>
        body{
            background-color: #FCDFD9;
            height: 100%;
            width: 100%;
        }

        h1{
            margin-top: 5%;
            font-family: Poppins;
            color: #D90429;
            font-size: 50px;
        }
        p{
            font-family: Montserrat;
            color: #2E1E0F;
            line-height: 200%;
        }
        h4{
            font-family: Poppins;
            color: #D90429;
        }
        a{
            color: #A73997;
        }
        a:hover{
            color: #6576F6;
        }

        .space{
           margin-right: 30px;
        }

        .meimg{
           width: 100%;
           margin-top: 20%;
        }

        .icon{
            height: 30px;
            width: 30px;
            margin-top: 10px;
            margin-right: 20px;
        }
        .icon:hover{
            opacity: 50%;
        }

    </style>

</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-5 space">
                <img class="meimg" src="static/images/headshot2.jpg" alt="Me!"/>
            </div>
            <div class="col-md-6 align-self-center text">
                <div class="row"><h1>Hi, I'm Vivian!</h1></div>
                <div class="row"></div>
                <div class="row"><p>I'm currently pursuing a PhD at Carnegie Mellon's <a href="https://www.ri.cmu.edu/">Robotics Institute</a>.
                <br>
                I graduated from <a href="https://www.engineering.columbia.edu/">Columbia University</a> with a BS in computer science.
                <br>
                I've worked at <a href="https://la.disneyresearch.com/">Disney</a>, <a href="https://institute.sandiegozoo.org/">San Diego Zoo</a>, <a href="https://conservationxlabs.com/">Conservation X Labs</a>, and <a href="https://www.jpl.nasa.gov/">NASA</a>.
                <br>
                In my free time I <a href="https://medium.com/@vhshen">write</a>, <a href="https://www.instagram.com/jr.scout.viv/">take photos</a>, and play a LOT of ultimate frisbee.
                <br>
                </p></div>
                <div class="row"><h4>Connect with me!</h4></div>
                <div class="row">
                    <a href="mailto:vivianhshen@gmail.com"><img class="icon" src="static/images/email.png" title="email"></a>
                    <a href="https://linkedin.com/in/vhshen"><img class="icon" src="static/images/linkedin.png" title="linkedin"></a>
                    <a href="https://github.com/vhshen"><img class="icon" src="static/images/github.png" title="github"></a>
                    <a href="https://devpost.com/vhshen"><img class="icon" src="static/images/devpost.png" title="devpost"></a>
                    <a href="static/Vivian_Shen_Resume.pdf"><img class="icon" src="static/images/resume.png" title="resume"></a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
