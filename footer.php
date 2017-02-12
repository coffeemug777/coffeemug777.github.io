    <footer>
        <div class="mainWrap">
            <div id="copyRightText">Prasetyo Denny Wibowo &copy; <script type="text/javascript">var currentYear = (new Date).getFullYear(); document.write(currentYear);</script>. All Rights Reserved.</div>
        </div>
    </footer>

<div id="wrapper1Hidden">
    <div class="mainWrap">
        <nav class="topNav">
            <div id="logo"><a href="/">Prasetyo <span id="middleName">Denny<span> <span id="lastName">Wibowo</span></a></div>
            <a id="menu-toggle2" class="anchor-link" href="#">Menu</a>
            <ul class="simple-toggle" id="menu2">
                <li><a href="#myWork">my work</a>
                <li><a href="files/resume-2015.pdf" target="_blank">resume</a></li>
                <li><a href="mailto:indocoffee@gmail.com">contact</a></li>
            </ul>
        </nav>
    </div>
</div> <!--wrapper1-->    
<div id="skrollr-body"></div>   
<div id="autohidebacktotop"><a href="#top"><i class="fa fa-arrow-circle-up"></i></a></div>

<?php

require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;

$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');

if ($deviceType == 'computer'){?>
    <script type="text/javascript">
    skrollr.init({
        forceHeight: false
    });
    </script>
<?php    
}
?>
</body>
</html>