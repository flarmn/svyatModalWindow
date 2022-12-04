let svyatmodalWindow = {}

svyatmodalWindow.show = function ({
  dialogWidth = $(document).width() / 4,
  leftPos,
  topPos,
  headerText,
  headerBackgrColor = "#00ace6",
  htmlContent,
  clickTarget,
  event,
}) {
  clickTarget ||= $(event.target)
  leftPos ||= clickTarget.parent().offset().left - $(document).width() / 18
  topPos ||= clickTarget.parent().offset().top + clickTarget.height()
  window.runwindowtimer = setTimeout(function () {
    $("body").append(
      `
            <div class="dialog-win">
                <div class="dialog-win-header" style="background-color:${headerBackgrColor};">
                    <span class="header-text">${headerText}</span>
                    <span class="close-dialog-win"><i class="fa fa-times-circle"></i></span>
                </div>
                <div class="dialog-win-content"></div>
            </div>`
    )

    $(".dialog-win-content").html(htmlContent)
    $(".dialog-win").width(dialogWidth)

    if (leftPos + $(".dialog-win").width() > $(document).width()) {
      leftPos = $(document).width() - $(".dialog-win").width() - 35
    }

    $(".dialog-win").css("top", `${topPos}px`)
    $(".dialog-win").css("left", `${leftPos}px`)

    $('[data-toggle="tooltip"]').tooltip()

    $(document).on("click", ".close-dialog-win", function () {
      svyatmodalWindow.close()
    })

    $(document).on("click", function (e) {
      e.stopPropagation()
      if ($(e.target).parents(".dialog-win").length == 0) {
        svyatmodalWindow.close()
        $("#users-table_wrapper .btn-group").parent().css("height", "unset")
      }
    })

    /* Dialog window conditional positioning */
    if (
      clickTarget.parents("tfoot").length != 0 ||
      ($(".dataTable tr").length != 2 &&
        $(".dataTable tr").length - (clickTarget.closest("tr").index() + 2) <
          4 &&
        $(".dataTable tr").length > 4)
    ) {
      $(".dialog-win").css("top", "unset")
      $(".dialog-win").css(
        "top",
        `${
          clickTarget.offset().top -
          $(".dialog-win").height() -
          clickTarget.height()
        }px`
      )
    } else {
      $(".dialog-win").css("top", "unset")
      $(".dialog-win").css(
        "top",
        `${clickTarget.offset().top + clickTarget.height() * 2}px`
      )

      if ($(window).height() - event.clientY < $(".dialog-win").height()) {
        $("html, body").animate(
          {
            scrollTop: $(window).height() - $(".dialog-win").height(),
          },
          800
        )
      }
    }
  })
}

svyatmodalWindow.close = function () {
  $(".dialog-win").remove()
}
